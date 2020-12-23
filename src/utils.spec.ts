import { isArray, isObject, isPrimitiveType, mergeArray } from './utils'

describe('isArray', () => {
  it('should return true', () => {
    expect(isArray([])).toBeTruthy()
    expect(isArray([1, 2, 3, 4])).toBeTruthy()
  })

  it('should return false', () => {
    expect(isArray({})).toBeFalsy()
    expect(isArray(undefined)).toBeFalsy()
    expect(isArray(null)).toBeFalsy()
    expect(isArray(true)).toBeFalsy()
    expect(isArray(false)).toBeFalsy()
    expect(isArray(1)).toBeFalsy()
    expect(isArray('a')).toBeFalsy()
  })
})

describe('isObject', () => {
  it('should return true', () => {
    expect(isObject({})).toBeTruthy()
    expect(isObject({ a: 1, b: 2 })).toBeTruthy()
  })

  it('should return false', () => {
    expect(isObject(undefined)).toBeFalsy()
    expect(isObject(null)).toBeFalsy()
    expect(isObject(true)).toBeFalsy()
    expect(isObject(false)).toBeFalsy()
    expect(isObject(1)).toBeFalsy()
    expect(isObject('a')).toBeFalsy()
  })
})

describe('isPrimitiveType', () => {
  it('should return true', () => {
    expect(isPrimitiveType(undefined)).toBeTruthy()
    expect(isPrimitiveType(null)).toBeTruthy()
    expect(isPrimitiveType(true)).toBeTruthy()
    expect(isPrimitiveType(false)).toBeTruthy()
    expect(isPrimitiveType(1)).toBeTruthy()
    expect(isPrimitiveType('a')).toBeTruthy()
  })
  it('should return false', () => {
    expect(isPrimitiveType({})).toBeFalsy()
    expect(isPrimitiveType([])).toBeFalsy()
    expect(isPrimitiveType(new Date())).toBeFalsy()
    expect(isPrimitiveType(new Number(100))).toBeFalsy()
    expect(isPrimitiveType(new String('hello world'))).toBeFalsy()
    expect(isPrimitiveType(function () {})).toBeFalsy()
    expect(isPrimitiveType(() => {})).toBeFalsy()
    expect(isPrimitiveType(Symbol())).toBeFalsy()
  })
})

describe('mergeArray', () => {
  const a = [1, 2, false, true, 'b']

  it('should return and empty array', () => {
    expect(mergeArray(a, undefined)).toEqual([])
    expect(mergeArray(a, null)).toEqual([])
  })

  it('should return a copy of b', () => {
    const b = ['a', 'b']
    const result = mergeArray(a, b)
    expect(result).not.toBe(b)
    expect(result).toEqual(b)
  })

  it('should add b to the array', () => {
    const bValues = [true, false, 1, 'a', {}]

    bValues.map((b) => {
      const result = mergeArray(a, b)

      expect(result).toEqual([...a, b])
    })
  })
})
