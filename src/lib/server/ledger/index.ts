import { id } from "tigerbeetle-node";
import { createClient } from "tigerbeetle-node";
import { BEETLE_HOST, BEETLE_PORT } from "$env/static/private";

const client = createClient({
    cluster_id: 0n,
    replica_addresses: [`${BEETLE_HOST}:${BEETLE_PORT}`],
  });

const account0 = {
    id: 100n,
    debits_pending: 0n,
    debits_posted: 0n,
    credits_pending: 0n,
    credits_posted: 0n,
    user_data_128: 0n,
    user_data_64: 0n,
    user_data_32: 0,
    reserved: 0,
    ledger: 1,
    code: 1,
    timestamp: 0n,
    flags: AccountFlags.linked | AccountFlags.debits_must_not_exceed_credits,
  };
  const account1 = {
    id: 101n,
    debits_pending: 0n,
    debits_posted: 0n,
    credits_pending: 0n,
    credits_posted: 0n,
    user_data_128: 0n,
    user_data_64: 0n,
    user_data_32: 0,
    reserved: 0,
    ledger: 1,
    code: 1,
    timestamp: 0n,
    flags: AccountFlags.history,
  };
  
  const account_errors = await client.createAccounts([account0, account1]);
  // Error handling omitted.
