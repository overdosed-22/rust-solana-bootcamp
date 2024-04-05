import { Connection,LAMPORTS_PER_SOL,PublicKey } from "@solana/web3.js";

const publicKey = new PublicKey("GvAFVpc3cYxZWn78i9hTmRPeLWmh4V5sAATNyUcBrjxi");

const connection = new Connection("https://devnet.helius-rpc.com/?api-key=26104f5d-8d2f-4f85-b210-366a6023acf2","confirmed");

const balanceInLamports = await connection.getBalance(publicKey);

// const balanceInLamports = await connection.getClusterNodes();


const balanceInSOL = balanceInLamports / LAMPORTS_PER_SOL;

console.log(`💰 Finished! The balance for the wallet at address ${publicKey} is ${balanceInSOL}`);


