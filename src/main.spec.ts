import recursiveMerge from './main'

describe('recursiveMerge', () => {
  describe('when a[field] is an array', () => {
    it('should add b[field] if b[field] is not an array', () => {
      const a = { field: [1] }
      const b = { field: 'b' }
      expect(recursiveMerge(a, b)).toEqual({ field: [1, 'b'] })
    })

    it('should set an empty array if b[field] is undefined or null', () => {})
    const a = { field: [1] }
    const b = { field: undefined }
    expect(recursiveMerge(a, b)).toEqual({ field: [] })

    it('should set b[field] if b[field] is an array', () => {
      const a = { field: [1] }
      const b = { field: ['a', 'b'] }
      expect(recursiveMerge(a, b)).toEqual({ field: ['a', 'b'] })
    })
  })

  it('should remove a[field] if b[field] is undefined', () => {
    const a = { field: 1 }
    const b = { field: undefined }
    expect(recursiveMerge(a, b)).toEqual({})
  })

  it('should set b[field] if b[field] is a non-complex type.', () => {
    for (const field of [2, 'a', true, false]) {
      const a = { field: 1 }
      const b = { field }
      expect(recursiveMerge(a, b)).toEqual({ field })
    }
  })

  it('should merge nested objects at any level', () => {
    const a = {
      field: {
        a: [1, 2, 3],
        b: 1,
        c: true,
        k: {
          l: [1, 2, 3],
        },
      },
    }
    const b = {
      field: {
        a: 4,
        d: true,
        e: null,
        k: {
          l: undefined,
          m: 1,
        },
      },
    }

    expect(recursiveMerge(a, b)).toEqual({
      field: {
        a: [1, 2, 3, 4],
        b: 1,
        c: true,
        d: true,
        e: null,
        k: {
          l: [],
          m: 1,
        },
      },
    })
  })

  it('should return a merged object properly', () => {
    const a = {
      first_name: 'Bob',
      last_name: 'Joness',
      email: 'bob@gmail.com',
      address: {
        line_1: '1234 Main St',
        line_2: 'Apt 413',
        city: 'Los Angeles',
        state: 'CA',
        zip: '90048',
      },
      logins: [
        { date: '10/22/2012', ip: '192.168.0.1' },
        { date: '10/21/2012', ip: '192.168.0.1' },
      ],
      photos: ['IMG-1985.jpg', 'IMG-1987.jpg'],
    }

    const b = {
      last_name: 'Jones',
      active: true,
      address: {
        line_1: '2143 South Main St',
        line_2: undefined,
      },
      logins: { date: '10/23/2012', ip: '192.168.0.1' },
      photos: undefined,
    }

    const expectedResult = {
      first_name: 'Bob',
      last_name: 'Jones',
      active: true,
      email: 'bob@gmail.com',
      address: {
        line_1: '2143 South Main St',
        city: 'Los Angeles',
        state: 'CA',
        zip: '90048',
      },

      logins: [
        { date: '10/22/2012', ip: '192.168.0.1' },
        { date: '10/21/2012', ip: '192.168.0.1' },
        { date: '10/23/2012', ip: '192.168.0.1' },
      ],

      photos: [],
    }

    expect(recursiveMerge(a, b)).toEqual(expectedResult)
  })
})
