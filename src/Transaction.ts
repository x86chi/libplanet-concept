import { ec as EC, BNInput, SignatureInput } from 'elliptic';

export const ec = new EC('secp256k1');

export interface Transaction {
  signature: string;
  timeStamp: number;
  publicKey: string;
}

export interface TransactionPayload {
  payload: Transaction[] | [];
}

export type Verify = (msg: BNInput, signature: SignatureInput) => boolean;
