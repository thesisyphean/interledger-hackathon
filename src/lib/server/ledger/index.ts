import { id } from "tigerbeetle-node";
import { createClient } from "tigerbeetle-node";
import { BEETLE_HOST, BEETLE_PORT } from "$env/static/private";
import { addLoan } from "../database/loans";

let acc_id = 0;


const client = createClient({
    cluster_id: 0n,
    replica_addresses: [`${BEETLE_HOST}:${BEETLE_PORT}`],
  });

export async function createAccount(id: number, uuid:string) {
    const account = {
        id: BigInt(id),
        debits_pending: 0n,
        debits_posted: 0n,
        credits_pending: 0n,
        credits_posted: 0n,
        user_data_128: BigInt(
            "0x" + uuid.replace(/-/g, "")
        ),
        user_data_64: 0n,
        user_data_32: 0,
        reserved: 0,
        ledger: 1,
        code: 1,
        timestamp: 0n,
        flags: 0,
      };
      const error = client.createAccounts([account]);
      return account;
    };

export async function createLoan(id1: string, id2: string, amount:number, donation:boolean){
    let account_errors = await createAccount(acc_id, id1);
    acc_id ++;
    account_errors = await createAccount(acc_id, id2);
    acc_id ++;
    addLoan(id1,id2,acc_id-1, acc_id, amount, donation);
    const transfers = [{
        id: id(), // TigerBeetle time-based ID.
        debit_account_id: BigInt(acc_id-1),
        credit_account_id: BigInt(acc_id-2),
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
      }];
      const transfer_errors = await client.createTransfers(transfers);
}

export async function getLoanBalance(id1: number, id2: number) {
    let accounts = await client.lookupAccounts([BigInt(id1)]);
    console.log(accounts[0]);
    console.log(id2);
    return accounts[0].credits_posted - accounts[0].debits_posted;
}

export async function payAmount(id1:number, id2:number, amount:number) {
    const transfers = [{
        id: id(), // TigerBeetle time-based ID.
        debit_account_id: BigInt(id1),
        credit_account_id: BigInt(id2),
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
      }];
      
      const transfer_errors = await client.createTransfers(transfers);
}
  
await createLoan("8c7ccbb1-4b6f-4b7d-8c7f-4f2bb3b14efc", "0a2ee7bc-04d9-4445-a7a0-b298f4760ff9", 10, false);
console.log("Whee");
console.log(await getLoanBalance(acc_id-1, acc_id-2));
  // Error handling omitted.
