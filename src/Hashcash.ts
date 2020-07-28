import { sha256 } from './utils';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { MineProps, TimeStamps } from './Block';

interface Solved {
  nonce: number;
  difficulty: number;
  timeStemp: number;
}

export function solve(props: MineProps, TimeStamps?: TimeStamps): Solved {
  let nonce = 1;
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const hash = sha256(JSON.stringify({ ...props, nonce }));
    if (isHasLeadingZero(hash, props.difficulty)) break;
    nonce += 1;
  }

  const timeStemp = +new Date();
  if (TimeStamps === undefined)
    return {
      nonce,
      difficulty: props.difficulty,
      timeStemp,
    };

  const previousMiningTime = TimeStamps[1] - TimeStamps[0];
  const currentMiningTime = timeStemp - TimeStamps[1];

  if (currentMiningTime === previousMiningTime) {
    return {
      nonce,
      difficulty: props.difficulty,
      timeStemp,
    };
  }

  if (currentMiningTime < previousMiningTime)
    return {
      nonce,
      difficulty: props.difficulty + 1 <= 64 ? props.difficulty + 1 : 64,
      timeStemp,
    };

  return {
    nonce,
    difficulty: props.difficulty - 1 < 0 ? 0 : props.difficulty - 1,
    timeStemp,
  };
}

function isHasLeadingZero(digest: string, difficulty: number) {
  return digest.startsWith('0'.repeat(difficulty));
}
