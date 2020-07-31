import { encode } from 'bencodex';

import { solve } from './Hashcash';
import { sha256 } from './utils';

export interface Mine {
  index: number;
  difficulty: number;
  previousHash: null | Buffer;
}

export interface Block extends Mine {
  nonce: number;
  timeStamp: number;
}

export type TimeStamps = [number, number];

export function mine(props: Mine, TimeStamps?: TimeStamps): Block {
  return { ...props, ...solve(props, TimeStamps) };
}

export function hash(props: Block) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return sha256(encode(props));
}
