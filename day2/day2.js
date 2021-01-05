'use strict'
const fs = require('fs')
const path = require('path')

const input = fs.readFileSync(path.join(__dirname, 'day2.input')).toString()
// const input = fs.readFileSync(path.join(__dirname, 'day2-sample.input')).toString()

const arr = new Set(input.split('\n'))

// part 1
let valid = 0

for (let row of arr) {
  const [policy, ...rest] = row.split(':')
  const map = rest.join('').split('').reduce((acc, letter) => ({
    ...acc,
    [letter]: (acc[letter] || 0) + 1
  }), {});
  const [times, letter] = policy.split(' ')
  const [lowest, highest] = times.split('-').map(Number)
  if (map[letter] <= highest && map[letter] >= lowest) {
    valid++
  }
}

console.log('1 $', valid)

// part 2
valid = 0

for (let row of arr) {
  const [policy, ...rest] = row.split(':')
  const passW = rest.join('').trim().split('')
  const [times, letter] = policy.split(' ')
  const [posA, posB] = times.split('-').map(Number).map(v => v -1)
  if (passW[posA] === letter ^ passW[posB] === letter) {
    valid++
  }
}

console.log('2 $', valid)