import * as web3 from "@solana/web3.js";
import "dotenv/config";
import base58 from "bs58";
import { getKeypairFromEnvironment,airdropIfRequired } from "@solana-developers/helpers";

const PING_PROGARM_ADDRESS = new web3.PublicKey("ChT1B39WKLS8qUrkLvFDXMhEJ4F1XZzwUNHUt4AU9aVa");
const PING_PROGARM_DATA_ADDRESS = new web3.PublicKey("Ah9K7dQ8EHaZqcAsgBW8w37yN2eAy3koFmUn4x3CJtod")
const payer = getKeypairFromEnvironment("SECRET_KEY")
const connection = new web3.Connection("https://devnet.helius-rpc.com/?api-key=26104f5d-8d2f-4f85-b210-366a6023acf2","confirmed")

const newBalance = await airdropIfRequired(
    connection,
    payer.publicKey,
    1 * web3.LAMPORTS_PER_SOL,
    0.5 * web3.LAMPORTS_PER_SOL
);

const transaction = new web3.Transaction();
const programId = new web3.PublicKey(PING_PROGARM_ADDRESS);
const pingProgramDataId = new web3.PublicKey(PING_PROGARM_DATA_ADDRESS);

const instruction = new web3.TransactionInstruction({
    keys: [
        {
            pubkey: pingProgramDataId,
            isSigner: false,
            isWritable: true
        },
    ],
    programId
})

transaction.add(instruction);

const signature = await web3.sendAndConfirmTransaction(
    connection,
    transaction,
    [payer]
)

console.log(`✅ Transaction completed! Signature is ${signature}`);
