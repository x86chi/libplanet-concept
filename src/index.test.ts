import { Block, mine, hash } from './Block';

describe('블록 연결하기', () => {
  const blocks: Block[] = [];

  const genesisBlock = mine({
    index: 0,
    difficulty: 0,
    previousHash: null,
  });
  blocks.push(genesisBlock);

  it('하나 넣고!', () => {
    blocks.push(
      mine({
        index: genesisBlock.index + 1,
        difficulty: genesisBlock.difficulty,
        previousHash: hash(genesisBlock),
      })
    );
  });
});
