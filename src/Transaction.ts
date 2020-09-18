import { KeyObject } from './utils';

export interface Transaction {
  signature: Buffer;
  timeStamp: number;
  publicKey: KeyObject;
}

export interface TransactionPayload {
  payload: Transaction | null;
}
