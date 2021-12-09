import { build } from 'vite'
import { join } from 'path'
import fs from 'fs'
import { blurHash } from '../src/index'

process.chdir(join(__dirname, '__fixtures__'))

const blurhashMapFilePath = process.cwd() + '/images/blurhash-map.json';

describe('vite-blurhash', () => {
  it('use imageDir options', async () => {
    const p = await build({
      logLevel: 'warn',
      build: { write: false },
      plugins: [
        blurHash({
          imageDir: '/images',
          mapPath: '/images/blurhash-map.json'
        })
      ]
    })

    expect(fs.existsSync(blurhashMapFilePath)).toBe(true);
    
    expect(JSON.parse(fs.readFileSync(blurhashMapFilePath, 'utf-8'))).toEqual(
      {"picklerickJpeg": "\"UJFZsH%g=kxu%4xcNEOQRSWmR$s=xuofs;e?\""}
    );
  })

  it('use images array options', async () => {
    const p = await build({
      logLevel: 'warn',
      build: { write: false },
      plugins: [
        blurHash({
          imageDir: false,
          mapPath: '/images/blurhash-map.json',
          images: {
            pickleRick: '/images/picklerick.jpeg'
          }
        })
      ]
    })

    expect(fs.existsSync(blurhashMapFilePath)).toBe(true);
    
    expect(JSON.parse(fs.readFileSync(blurhashMapFilePath, 'utf-8'))).toEqual(
      {"pickleRick": "\"UJFZsH%g=kxu%4xcNEOQRSWmR$s=xuofs;e?\""}
    );
  })
})