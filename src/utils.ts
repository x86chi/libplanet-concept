import crypto, { HexBase64Latin1Encoding } from 'crypto';

export function sha256(data: string, encoding?: HexBase64Latin1Encoding) {
  const hash = crypto.createHash('sha256').update(data);
  return encoding === undefined ? hash.digest() : hash.digest(encoding);
}
export function byteToBit(bytes: IterableIterator<number>) {
  let result = '';
  for (const byte of bytes) {
    let bits = '';
    for (let i = 7; i >= 0; i--) {
      bits += byte & (1 << i) ? 1 : 0;
    }
    result += bits;
  }
  return result;
}
