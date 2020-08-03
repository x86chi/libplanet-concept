import crypto from 'crypto';

import { Block, mine, hash } from './Block';
import { createSign } from './utils';

const elice = crypto.generateKeyPairSync('ec', { namedCurve: 'sect239k1' });
const bob = crypto.generateKeyPairSync('ec', { namedCurve: 'sect239k1' });

describe('블록 연결하기', () => {
  const blocks: Block[] = [];

  const genesisBlock = mine({
    index: 0,
    difficulty: 0,
    previousHash: null,
  });
  blocks.push(genesisBlock);

  describe('두번째 블럭', () => {
    const block = mine({
      index: blocks.length,
      difficulty: genesisBlock.difficulty,
      previousHash: hash(genesisBlock),
    });
    it('난이도는 아직 0이다.', () => {
      expect(block.difficulty).toBe(0);
    });
    it('논스 값은 1', () => {
      expect(block.nonce).toBe(1);
    });
    blocks.push(block);
  });
  describe('세번째 블럭', () => {
    const block = mine(
      {
        index: blocks.length,
        difficulty: blocks[blocks.length - 1].difficulty,
        previousHash: hash(blocks[blocks.length - 1]),
      },
      [blocks[blocks.length - 2].timeStamp, blocks[blocks.length - 1].timeStamp]
    );
    it('이전 블럭이 빠르게 채굴되서 난이도가 +1 증가합니다.', () => {
      expect(block.difficulty).toBe(1);
    });
    it('논스 값은 1', () => {
      expect(block.nonce).toBe(1);
    });
    blocks.push(block);
  });
  describe('블럭에 서명하기', () => {
    const block = mine(
      {
        index: blocks.length,
        difficulty: blocks[blocks.length - 1].difficulty,
        previousHash: hash(blocks[blocks.length - 1]),
        transaction: {
          signature: createSign(elice.privateKey, blocks.length.toString()),
          publicKey: elice.publicKey,
          timeStamp: +new Date(),
        },
      },
      [blocks[blocks.length - 2].timeStamp, blocks[blocks.length - 1].timeStamp]
    );
    it('이전 블럭이 빠르게 채굴되서 난이도가 +1 증가합니다.', () => {
      expect(block.difficulty).toBe(2);
    });
    it('논스 값은 1', () => {
      expect(block.nonce).toBe(1);
    });
    blocks.push(block);
  });
});
