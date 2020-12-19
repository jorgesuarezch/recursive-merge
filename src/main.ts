import { isArray, isObject, mergeArray } from './utils'

type Param = Record<string, any>

type Response = Param

/**
 * Return a new object with the result of merging b in a.
 * @param {Param} a
 * @param {Param} b
 *
 * @returns {Response} result
 */
const mergeObject = (a: Param, b: Param): Response => {
  const initialValue = { ...a }

  return Object.entries(b).reduce<Response>((acc, [field, bValue]) => {
    const aValue = acc[field]

    if (isObject(aValue) && isObject(bValue)) {
      return { ...acc, [field]: mergeObject(aValue, bValue) } // tail recursion
    }

    if (isArray(aValue)) {
      return { ...acc, [field]: mergeArray(aValue, bValue) }
    }

    if (bValue !== undefined && !isObject(bValue)) {
      acc[field] = bValue
    }

    if (bValue === undefined) {
      delete acc[field]
    }

    return acc
  }, initialValue)
}

export default mergeObject
