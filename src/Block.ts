import { encode } from 'bencodex';

import { solve } from './Hashcash';
import { sha256, verifySign } from './utils';

import { Transaction, TransactionPayload } from './Transaction';

export interface Mine {
  index: number;
  difficulty: number;
  previousHash: null | Buffer;
}

interface MineProps extends Mine {
  transaction?: Transaction;
}

export interface Block extends Mine, TransactionPayload {
  nonce: number;
  timeStamp: number;
}

export type TimeStamps = [number, number];

export function mine(props: MineProps, TimeStamps?: TimeStamps): Block {
  const { transaction, ...otherProps } = props;

  if (transaction) {
    if (
      !verifySign(
        transaction.signature,
        new Uint8Array(props.index),
        transaction.publicKey
      )
    ) {
      throw Error('유효하지 않은 서명입니다');
    }

    const data = { payload: transaction, ...otherProps };
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
