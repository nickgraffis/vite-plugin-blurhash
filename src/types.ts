export type Images = { [key: string]: string }

export type Options = {
  imageDir?: string | boolean,
  mapPath?: string | boolean,
  overrideMap?: boolean,
  define?: boolean,
  images?: Images,
  log?: boolean,
}