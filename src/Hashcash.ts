import { byteToBit } from './utils';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Mine, TimeStamps, hash } from './Block';
import { TransactionPayload } from './Transaction';

interface Solved {
  nonce: number;
  difficulty: number;
  timeStamp: number;
}

const goalMineingTime = 5000;

interface SolveProps extends Mine {
  payload: TransactionPayload[] | null;
}

export function solve(props: SolveProps, TimeStamps?: TimeStamps): Solved {
  let nonce = 1;
  let timeStamp = +new Date();
  while (
    !isHasLeadingZero(hash({ ...props, nonce, timeStamp }), props.difficulty)
  ) {
    timeStamp = +new Date();
    nonce += 1;
  }

  if (TimeStamps === undefined)
    return {
      nonce,
      difficulty: props.difficulty,
      timeStamp,
      payload: props.payload,
    };

  const miningTime = TimeStamps[1] - TimeStamps[0];

  if (miningTime === goalMineingTime) {
    return {
      nonce,
      difficulty: props.difficulty,
      timeStamp,
      payload: props.payload,
    };
  }

  if (miningTime < goalMineingTime)
    return {
      nonce,
      difficulty: props.difficulty + 1 <= 64 ? props.difficulty + 1 : 64,
      timeStamp,
      payload: props.payload,
    };

  return {
    nonce,
    difficulty: props.difficulty - 1 < 0 ? 0 : props.difficulty - 1,
    timeStamp,
    payload: props.payload,
  };
}

function isHasLeadingZero(digest: Buffer, difficulty: number) {
  return byteToBit(digest.values()).startsWith('0'.repeat(difficulty));
}
