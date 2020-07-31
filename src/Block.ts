import { encode } from 'bencodex';

import { solve } from './Hashcash';
import { sha256 } from './utils';

import { Transaction, Verify, TransactionPayload } from './Transaction';

export interface Mine {
  index: number;
  difficulty: number;
  previousHash: null | Buffer;
}

interface MineProps extends Mine {
  transaction?: Transaction & { verify: Verify };
}

export interface Block extends Mine, TransactionPayload {
  nonce: number;
  timeStamp: number;
}

export type TimeStamps = [number, number];

export function mine(props: MineProps, TimeStamps?: TimeStamps): Block {
  const { transaction, ...otherProps } = props;

  if (transaction) {
    const { verify, ...payload } = transaction;

    if (!verify(props.index, transaction.signature)) {
      throw Error('유효하지 않은 서명입니다');
    }

    const data = { payload: [payload], ...otherProps };
    return { ...data, ...solve(data, TimeStamps) };
  }

  const data = { payload: [], ...otherProps };

  return { ...data, ...solve(data, TimeStamps) };
}

export function hash(props: Block) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return sha256(encode(props));
}
