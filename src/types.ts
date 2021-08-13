export type Images = { [key: string]: string }

export type Options = {
  inputPath?: string | boolean,
  mapPath?: string,
  saveMap?: boolean,
  define?: boolean,
  images?: Images,
  log?: boolean,
}