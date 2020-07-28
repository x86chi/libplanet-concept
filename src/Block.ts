import { solve } from './Hashcash';
import { sha256 } from './utils';

interface ShareProps {
  index: number;
  difficulty: number;
}

export interface Block extends ShareProps {
  nonce: number;
  timestemp: number;
}

export type MineProps =
  | (ShareProps & { previousHash: null })
  | (ShareProps & { previousHash: string });

export function mine(props: MineProps): Block {
  const solved = solve(props);
  return { timestemp: +new Date(), ...solved, ...props };
}

export function hash(props: Block) {
  return sha256(JSON.stringify(props));
}
