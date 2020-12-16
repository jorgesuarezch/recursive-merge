# Recursive Merge
__recursiveMerge__ merges two objects recursively based on the next rules:

1. If `a[field]` is an array, and `b[field]` is defined and is not an array, add `b[field]` to the array
1. If `a[field]` is an array and `b[field]` exists but is undefined or null, set `a[field]` to an empty array
1. If `a[field]` is an array and `b[field]` is an array, set `a[field]` to `b[field]`
1. If `a[field]` exists and `b[field]` exists but is undefined, delete `a[field]`
1. If `b[field]` is a non-complex type (number, string, boolean, et cetera), copy to `a[field]`


## Install
```bash
npm install -S @jorgesuarezch/recursive-merge
```

## How to use

```js
const recursiveMerge = require('@jorgesuarezch/recursive-merge')
const assert = require('assert').strict;

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

const result = recursiveMerge(a, b)

// expected result
assert.deepStrictEqual(result, {
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
})
```

## Contribute
Any help is more than welcome.

### Clone repository
```bash 
git clone https://github.com/jorgesuarezch/recursive-merge.git
```

### Install dependencies
```bash 
npm install
```

### Start development
```bash 
npm start
```

### Run tests
```bash 
npm test
```
