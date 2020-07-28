interface ShareProps {
  index: number;
  difficulty: number;
}

export interface Block extends ShareProps {
  nonce: string;
  timestemp: number;
}

type MineProps =
  | (ShareProps & { previousHash: null })
  | (ShareProps & { previousHash: string });

export function mine(props: MineProps): Block;

export function hash(props: Block): string;
