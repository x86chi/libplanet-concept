import { ec as EC } from 'elliptic';

export const ec = new EC('secp256k1');

export interface Transaction {
  sender: Sender;
  recipient: Recipient;
  timeStamp: string;
}

interface Sender {
  signature: string;
}

interface Recipient {
  publicKey: string;
}

export interface TransactionPayload {
  signature: string;
  publicKey: string;
}
