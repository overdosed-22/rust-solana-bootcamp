import {
    Connection,
    Transaction,
    SystemProgram,
    sendAndConfirmTransaction,
    PublicKey
} from "@solana/web3.js"
import "dotenv/config"
import { getKeypairFromEnvironment } from "@solana-developers/node-helpers"
 const suppliedToPubKey = process.argv[2] || null;
  if(!suppliedToPubKey){
    console.log(`Please provide a public key to send to`);
    process.exit(1);
  }

  const senderKeyPair = getKeypairFromEnvironment("SECRET_KEY");

  console.log(`suppliedToPubKey: ${suppliedToPubKey}`);

  const toPubkey = new PublicKey(suppliedToPubKey);

  const connection = new Connection("https://devnet.helius-rpc.com/?api-key=4e7f0486-d5e7-4927-afba-846a06a0cff0","confirmed");

  console.log(`✅ Loaded our own keypair, the destination public key, and connected to Solana`);

  const transaction = new Transaction();

  const LAMPORTS_TO_SEND = 500000;

  const sendToInstruction = SystemProgram.transfer({
    fromPubkey: senderKeyPair.publicKey,
    toPubkey,
    lamports: LAMPORTS_TO_SEND,
  })

  transaction.add(sendToInstruction);

  const signature = await sendAndConfirmTransaction(connection,transaction, [senderKeyPair]);

  console.log(
    `💸 Finished! Sent $(LAMPORTS_TO_SEND) to the address ${toPubkey}.`
  );
  console.log(`Transaction signature is ${signature}`);
  
  


  