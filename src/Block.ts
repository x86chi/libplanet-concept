import { encode } from 'bencodex';

import { solve } from './Hashcash';
import { sha256 } from './utils';

import { Transaction, ec, TransactionPayload } from './Transaction';

export interface Mine {
  index: number;
  difficulty: number;
  previousHash: null | Buffer;
}

interface MineProps extends Mine {
  transaction?: Transaction;
}

export interface Block extends Mine {
  nonce: number;
  timeStamp: number;
  payload: TransactionPayload[] | null;
}

export type TimeStamps = [number, number];

export function mine(props: MineProps, TimeStamps?: TimeStamps): Block {
  const { transaction, ...otherProps } = props;

  if (transaction) {
    const payload: TransactionPayload = {
      signature: transaction.sender.signature,
      publicKey: transaction.recipient.publicKey,
    };
    const data = { payload, ...otherProps };
    return { ...data, ...solve(data, TimeStamps) };
  }

  const data = { payload: null, ...otherProps };

  return { ...data, ...solve(data, TimeStamps) };
}

export function hash(props: Block) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return sha256(encode(props));
}
