import crypto from 'crypto';

export type KeyObject = crypto.KeyObject;

const Algorithm = 'SHA256';

export function sha256(data: Buffer) {
  return crypto.createHash(Algorithm).update(data).digest();
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

export function createSign(privateKey: KeyObject, payload: Buffer) {
  const sign = crypto.createSign(Algorithm);
  sign.update(payload);
  sign.end();
  return sign.sign(privateKey);
}

export function verifySign(
  signature: Buffer,
  payload: Buffer,
  publicKey: KeyObject
) {
  const verify = crypto.createVerify(Algorithm);
  verify.update(payload);
  verify.end();
  return verify.verify(publicKey, signature);
}
