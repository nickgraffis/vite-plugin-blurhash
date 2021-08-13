export const isValidURL = (src: string) => {
  return /^((http|https|ftp):\/\/)/.test(src)
};