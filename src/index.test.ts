import { Block, mine, hash } from './Block';

describe('블록 연결하기', () => {
  const blocks: Block[] = [];

  const genesisBlock = mine({
    index: 0,
    difficulty: 0,
    previousHash: null,
  });
  blocks.push(genesisBlock);

  it('두개 넣고!', () => {
    blocks.push(
      mine({
        index: blocks.length,
        difficulty: genesisBlock.difficulty,
        previousHash: hash(genesisBlock),
      })
    );
    blocks.push(
      mine(
        {
          index: blocks.length,
          difficulty: blocks[blocks.length - 1].difficulty,
          previousHash: hash(blocks[blocks.length - 1]),
        },
        [
          blocks[blocks.length - 2].timeStemp,
          blocks[blocks.length - 1].timeStemp,
        ]
      )
    );
  });
});
