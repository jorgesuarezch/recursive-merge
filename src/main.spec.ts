import duplicate from './main'

describe('duplicate', () => {
  it('should return the given value multiplied by 2', () => {
    expect(duplicate(2)).toBe(4)
    expect(duplicate(4)).toBe(8)
  })
})
