/**
 * 是否为外部链接
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path: string): boolean {
  return /^(https?:|http?:|mailto:|tel:)/.test(path)
}