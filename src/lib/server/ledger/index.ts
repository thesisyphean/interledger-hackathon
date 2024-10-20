import { id } from "tigerbeetle-node";
import { createClient } from "tigerbeetle-node";
import { BEETLE_HOST, BEETLE_PORT } from "$env/static/private";
import { addLoan, getLoanById } from "../database/loans";

let acc_id = 1;

const client = createClient({
  cluster_id: 0n,
  replica_addresses: [`${BEETLE_HOST}:${BEETLE_PORT}`],
});

export async function createAccount(id: number, uuid: string) {
  const account = {
    id: BigInt(id),
    debits_pending: 0n,
    debits_posted: 0n,
    credits_pending: 0n,
    credits_posted: 0n,
    user_data_128: BigInt("0x" + uuid.replace(/-/g, "")),
    user_data_64: 0n,
    user_data_32: 0,
    reserved: 0,
    ledger: 1,
    code: 1,
    timestamp: 0n,
    flags: 0,
  };
  await client.createAccounts([account]);
  return account;
}

export async function createLoan(idTo: string, idFrom: string, amount: number, donation: boolean) {
  await createAccount(acc_id, idTo);
  acc_id++;
  await createAccount(acc_id, idFrom);
  acc_id++;
  await addLoan(idTo, idFrom, acc_id - 2, acc_id - 1, amount, donation);
  const transfers = [
    {
      id: id(), // TigerBeetle time-based ID.
      debit_account_id: BigInt(acc_id - 1),
      credit_account_id: BigInt(acc_id - 2),
      amount: BigInt(amount),
      pending_id: 0n,
      user_data_128: 0n,
      user_data_64: 0n,
      user_data_32: 0,
      timeout: 0,
      ledger: 1,
      code: 720,
      flags: 0,
      timestamp: 0n,
    },
  ];
  await client.createTransfers(transfers);
}

export async function getLoanDebits(id: string) {
  const loan = await getLoanById(id);

  const accounts = await client.lookupAccounts([BigInt(loan.tigerBeetleId1)]);
  return Number(accounts[0].debits_posted);
}

export async function getLoanCredits(id: string) {
  const loan = await getLoanById(id);

  const accounts = await client.lookupAccounts([BigInt(loan.tigerBeetleId1)]);
  return Number(accounts[0].credits_posted);
}

export async function payAmount(loanId: string, amount: number) {
  const loan = await getLoanById(loanId);
  const transfers = [
    {
      id: id(), // TigerBeetle time-based ID.
      debit_account_id: BigInt(loan.tigerBeetleId1),
      credit_account_id: BigInt(loan.tigerBeetleId2),
      amount: BigInt(amount),
      pending_id: 0n,
      user_data_128: 0n,
      user_data_64: 0n,
      user_data_32: 0,
      timeout: 0,
      ledger: 1,
      code: 720,
      flags: 0,
      timestamp: 0n,
    },
  ];

  await client.createTransfers(transfers);
}

// await createLoan("8c7ccbb1-4b6f-4b7d-8c7f-4f2bb3b14efc", "0a2ee7bc-04d9-4445-a7a0-b298f4760ff9", 10, false);
// console.log(await getLoanBalance(1, 2));
