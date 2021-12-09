import { getFilesRecursively } from './getFilesRecursively';
import { Images } from '../types';
import isImage from 'is-image';
import camelcase from 'camelcase';
import { isValidURL } from './logics';
import { existsSync } from 'fs';

export const mergeImagesAndImageDir = ({ images, imageDir }: { images: Images, imageDir: string | false }) => {
  let img = []
  if (imageDir) {
    const files = getFilesRecursively(imageDir)
    for (let i = 0; i < files.length; i++) {
      let file = files[i]
      if (isImage(file)) {
        let fileName = file.split(imageDir)[file.split(imageDir).length - 1]
        fileName = fileName.replace(/\//g, '.');
        img.push({ [camelcase(fileName)]: file })
      }
    }
  }

  return [
    ...img,
    ...Object.keys(images).reduce<{ [key: string]: string }[]>((filtered, key) => {
      if (isValidURL(images[key]) || (existsSync(process.cwd() + images[key]) && isImage(images[key]))) {
        filtered.push({ [key]: isValidURL(images[key]) ? images[key] : process.cwd() + images[key] })
      }
      return filtered
    }, [])
  ]
}