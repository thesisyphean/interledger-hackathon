import {
  createAuthenticatedClient,
  isFinalizedGrant,
  isPendingGrant,
  type AuthenticatedClient,
  type Grant,
  type IncomingPayment,
  type PendingGrant,
  type Quote,
  type WalletAddress,
} from "@interledger/open-payments";
import {
  OPENPAYMENTS_WALLET_ADDRESS,
  OPENPAYMENTS_KEY_ID,
  OPENPAYMENTS_PRIVATE_KEY,
} from "$env/static/private";
import crypto from "node:crypto";
import { registerInteract } from "./interact";
import { error, redirect } from "@sveltejs/kit";
import type { Amount } from ".";

async function makeIncomingPaymentGrant(client: AuthenticatedClient, wallet: WalletAddress) {
  const grant = await client.grant.request(
    { url: wallet.authServer },
    {
      access_token: {
        access: [
          {
            type: "incoming-payment",
            actions: ["list", "read", "read-all", "complete", "create"],
          },
        ],
      },
    },
  );

  if (isPendingGrant(grant)) {
    throw new Error("Expected non-interactive grant");
  }

  return grant;
}

async function makeIncomingPayment(
  client: AuthenticatedClient,
  wallet: WalletAddress,
  grant: Grant,
  amount: Amount,
) {
  return await client.incomingPayment.create(
    {
      url: wallet.resourceServer,
      accessToken: grant.access_token.value,
    },
    {
      walletAddress: wallet.id,
      incomingAmount: amount,
      expiresAt: new Date(Date.now() + 60_000 * 10).toISOString(),
    },
  );
}

async function makeQuoteGrant(client: AuthenticatedClient, wallet: WalletAddress) {
  const grant = await client.grant.request(
    {
      url: wallet.authServer,
    },
    {
      access_token: {
        access: [
          {
            type: "quote",
            actions: ["create", "read", "read-all"],
          },
        ],
      },
    },
  );

  if (isPendingGrant(grant)) {
    throw new Error("Expected non-interactive grant");
  }

  return grant;
}

async function makeQuote(
  client: AuthenticatedClient,
  wallet: WalletAddress,
  grant: Grant,
  payment: IncomingPayment,
) {
  return await client.quote.create(
    {
      url: wallet.resourceServer,
      accessToken: grant.access_token.value,
    },
    {
      method: "ilp",
      walletAddress: wallet.id,
      receiver: payment.id,
    },
  );
}

async function makeOutgoingPaymentGrant(
  client: AuthenticatedClient,
  wallet: WalletAddress,
  redirectUri: string,
  nonce: string,
  quote: Quote,
) {
  return (await client.grant.request(
    { url: wallet.authServer },
    {
      access_token: {
        access: [
          {
            identifier: wallet.id,
            type: "outgoing-payment",
            actions: ["list", "list-all", "read", "read-all", "create"],
            limits: {
              receiveAmount: quote.receiveAmount,
              debitAmount: quote.debitAmount,
            },
          },
        ],
      },
      interact: {
        start: ["redirect"],
        finish: {
          method: "redirect",
          uri: redirectUri,
          nonce,
        },
      },
    },
  )) as PendingGrant;
}

async function makeOutgoingPayment(
  client: AuthenticatedClient,
  wallet: WalletAddress,
  grant: Grant,
  quote: Quote,
) {
  return await client.outgoingPayment.create(
    {
      url: wallet.resourceServer,
      accessToken: grant.access_token.value,
    },
    {
      walletAddress: wallet.id,
      quoteId: quote.id,
    },
  );
}

export async function pay(
  src: string,
  dst: string,
  amount: Amount,
  callback: () => Promise<void>,
): Promise<never> {
  const client = await createAuthenticatedClient({
    walletAddressUrl: OPENPAYMENTS_WALLET_ADDRESS,
    keyId: OPENPAYMENTS_KEY_ID,
    privateKey: Buffer.from(OPENPAYMENTS_PRIVATE_KEY, "base64"),
  });

  const walletOut = await client.walletAddress.get({
    url: src,
  });
  const walletIn = await client.walletAddress.get({
    url: dst,
  });

  const grantIn = await makeIncomingPaymentGrant(client, walletIn);
  const paymentIn = await makeIncomingPayment(client, walletIn, grantIn, amount);

  const grantQuote = await makeQuoteGrant(client, walletOut);
  const quote = await makeQuote(client, walletOut, grantQuote, paymentIn);

  const continueKey = crypto.randomUUID();
  const nonce = crypto.randomUUID();
  const pendingGrantOut = await makeOutgoingPaymentGrant(
    client,
    walletOut,
    `http://localhost:5173/payment/interact/continue/${continueKey}`,
    nonce,
    quote,
  );

  registerInteract(continueKey, async (interactRef: string) => {
    const grantOut = await client.grant.continue(
      {
        accessToken: pendingGrantOut.continue.access_token.value,
        url: pendingGrantOut.continue.uri,
      },
      {
        interact_ref: interactRef,
      },
    );
    if (!isFinalizedGrant(grantOut)) {
      throw new Error("Expected finalized grant");
    }

    const paymentOut = await makeOutgoingPayment(client, walletOut, grantOut, quote);
    if (paymentOut.failed) {
      return error(500, "payment failed");
    }
    await callback();
  });

  return redirect(303, pendingGrantOut.interact.redirect);
}
