import { byteToBit } from './utils';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { MineProps, TimeStamps, hash } from './Block';

interface Solved {
  nonce: number;
  difficulty: number;
  timeStemp: number;
}

const goalMineingTime = 5000;

export function solve(props: MineProps, TimeStamps?: TimeStamps): Solved {
  let nonce = 1;
  while (!isHasLeadingZero(hash({ ...props, nonce }), props.difficulty)) {
    nonce += 1;
  }

  const timeStemp = +new Date();
  if (TimeStamps === undefined)
    return {
      nonce,
      difficulty: props.difficulty,
      timeStemp,
    };

  const miningTime = TimeStamps[1] - TimeStamps[0];

  if (miningTime === goalMineingTime) {
    return {
      nonce,
      difficulty: props.difficulty,
      timeStemp,
    };
  }

  if (miningTime < goalMineingTime)
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

function isHasLeadingZero(digest: Buffer, difficulty: number) {
  return byteToBit(digest.values()).startsWith('0'.repeat(difficulty));
}
