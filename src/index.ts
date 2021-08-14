import chalk from 'chalk';
import type { Plugin } from 'vite'
import type { Options } from './types'
import { blurhashThis } from './utils/blur';
import { readFileSync, writeFileSync, existsSync } from 'fs';
import { mergeImagesAndImageDir } from './utils/mergeImagesAndImageDir';

/**
 * Create a list of valid images and their blurhash strings. 
 * Save them to the define variabel inside vite and/or in the blurhash-map.json file.
 * @param {Options} options
 **/
export const defineHashes =  (options: Options): { define?: { [key: string]: string } } => {
  const imageDir = options.imageDir && existsSync(process.cwd() + options.imageDir) ? process.cwd() + options.imageDir : false //Get the image directory, unless set to false

  const imagesToBlur = mergeImagesAndImageDir({ 
    images: options?.images || {}, 
    imageDir: imageDir, 
  })

  const mapPath = options.mapPath ? process.cwd() + options.mapPath : false
  const blurhashMapExists = mapPath ? existsSync(mapPath) : false

  if (!blurhashMapExists && mapPath) {
    console.log(chalk.green(`Writing ${mapPath}.`))
    writeFileSync(mapPath, JSON.stringify({}));
  }

  const blurhashMap = mapPath ? JSON.parse(readFileSync(mapPath, 'utf8')) : {}

  for (let i = 0; i < imagesToBlur.length; i++) {
    let name = Object.keys(imagesToBlur[i])[0];
    let file = imagesToBlur[i][name]
    if (!blurhashMap[name]) {
      blurhashThis(file).then((hash) => {
        blurhashMap[name] = JSON.stringify(hash);
        if (mapPath) writeFileSync(
          mapPath, JSON.stringify(blurhashMap, null, 2)
        );
        if (options.log) console.log(chalk.green(`✔ Finished hashing ${name}!`));
      }).catch(err => {
        if (options.log) console.log(chalk.red(`✘ Failed hashing ${name}!`));
        if (options.log) console.log(err);
      });
    }
  }

  if (!options.define) return {}
  
  return {
    define: {
      ...blurhashMap
    }
  }
}

/**
 * @param {Options} options
 * @return {Plugin}
 * @options
 * - imageDir: string | boolean: The directory to read images from. Defaults to /src/assets/images
 * - mapPath: string | false: The path to save the blurhash map to. Defaults to /src/assets/images/blurhash-map.json
 * - define: boolean: Whether or not to define the blurhash map in the vite config. Defaults to true
 * - images: object: An object of images to blurhash. 
 * ---- key: string: The name of the image (for the blurhash map and the define global variable)
 * ---- value: string: The path to the image, or url to the image
 **/
const plugin = (options?: Options): Plugin => {
  const setoptions = {
    define: true, //Default define to true
    imageDir: '/src/assets/images', //Default inputPath to /src/assets/images
    mapPath: '/src/assets/images/blurhash-map.json', //Default mapPath to /src/assets/images/blurhash-map.json
    log: true, //Default log to true
    ...options
  }
  
  return {
    name: 'blurhash',
    buildStart() { }, //Calls the plugin config function on build start
    handleHotUpdate() { }, //Calls the plugin config function on hot update
    config: () => {
      return defineHashes(setoptions) //Create blurhash strings if needed, and add them to the config: define
    }
  }
}

export default plugin