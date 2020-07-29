import crypto from 'crypto';

export function sha256(data: string) {
  return crypto.createHash('sha256').update(data).digest();
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
