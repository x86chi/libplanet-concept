import { sha256 } from './utils';

import { MineProps } from './Block';

interface Nonce {
  nonce: number;
}

export function solve(props: MineProps) {
  let nonce = 1;
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const hash = sha256(JSON.stringify({ ...props, nonce }));

    if (isHasLeadingZero(hash, props.difficulty)) return { nonce };

    nonce += 1;
  }
}

function isHasLeadingZero(digest: string, difficulty: number) {
  return digest.startsWith('0'.repeat(difficulty));
}
