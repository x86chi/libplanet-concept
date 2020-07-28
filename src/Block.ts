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
  | (ShareProps & { previousHash: string });

export type TimeStemps = [number, number];

export function mine(props: MineProps, timeStemps?: TimeStemps): Block {
  return { ...props, ...solve(props, timeStemps) };
}

export function hash(props: Block) {
  return sha256(JSON.stringify(props));
}
