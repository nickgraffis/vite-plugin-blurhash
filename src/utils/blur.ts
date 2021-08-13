import sharp from 'sharp';
import { encode } from 'blurhash';
import request from 'request';
import { isValidURL } from './logics';

const blur = async (src: string, callback: (err: Error | null, hash?: string) => any) => {
  sharp(src)
  .raw()
  .ensureAlpha()
  .resize(32, 32, { fit: "inside" })
  .toBuffer((err, buffer, info) => {
    if (err) callback(err);
    try {
      const hash = encode(new Uint8ClampedArray(buffer), info?.width, info?.height, 4, 4)
      callback(null, hash);
    } catch (error) {
      callback(error)
    }
  });
}

export const blurhashThis = async (src: string) =>
  new Promise((resolve, reject) => {
    if (isValidURL(src)) {
      request({ url: src, encoding: null }, (err, response, body) => {
        if (err) reject(err)
        blur(body, (err, hash) => {
          if (err) reject(err)
          resolve(hash)
        })
      })
    } else blur(src, (err, hash) => {
      if (err) reject(err)
      resolve(hash)
    })
  });