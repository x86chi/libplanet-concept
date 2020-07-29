import { solve } from './Hashcash';
import { sha256 } from './utils';

interface ShareProps {
  index: number;
  difficulty: number;
}

export interface Block extends ShareProps {
  nonce: number;
  timeStemp: number;
}

export type MineProps =
  | (ShareProps & { previousHash: null })
  | (ShareProps & { previousHash: number[] });

export type TimeStamps = [number, number];

export function mine(props: MineProps, TimeStamps?: TimeStamps): Block {
  return { ...props, ...solve(props, TimeStamps) };
}

export function hash(props: Block) {
  return sha256(JSON.stringify(props)).toJSON().data;
}
