/**
 * Check if the given value is an array
 * @param value
 */
export const isArray = (value: unknown): boolean => Array.isArray(value)

/**
 * Check if the given value is an "object"
 * @param value
 */
export const isObject = (value: unknown): boolean =>
  value !== null && !isArray(value) && typeof value === 'object'

/**
 * Check if the given value is a primitive type
 * @param value
 */
export const isPrimitiveType = (value: unknown) =>
  value === null ||
  ['undefined', 'string', 'boolean', 'number', 'bigint'].includes(typeof value)

/**
 * Returns an array based on b parameter value
 * @param {unknown} a
 * @param {unknown} b
 */
export const mergeArray = (a: unknown[], b: unknown): unknown[] => {
  if (b === undefined || b === null) {
    return []
  }

  if (isArray(b)) {
    return [...(b as [])]
  }

  return [...a, b]
}
