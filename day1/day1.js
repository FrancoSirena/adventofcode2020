'use strict'
const fs = require('fs')

const input = fs.readFileSync('./day1.input').toString()
// const input = fs.readFileSync('./day1-sample.input').toString()

const arr = new Set(input.split('\n'))
let upper = []
let under = []

for (const val of arr) {
  const n = Number(val)
  if (n > 1000) {
    upper.push(n)
  } else {
    under.push(n)
  }
}

function check(upperVal, underVal) {
  const sum = upperVal + underVal
  if (sum === 2020) {
    return upperVal * underVal
  } else if (sum > 2020) {
    return false;
  }
  return undefined;
}

// part 1
upper.sort((a, b) => a - b)
under.sort((a, b) => a - b)

let found;
for (const valUpper of upper) {
  for (const valUnder of under) {
    found = check(valUpper, valUnder)
    if (found !== undefined)  {
      break
    }
  }
  if (typeof found === 'number') {
    break
  }
}

console.log('1 $ ', found)
found = undefined

const full = [...under, ...upper]

// part 2                         
let sum
let result
found = undefined

for (const [index, valUnder] of full.entries()) {
  sum = valUnder
  result = valUnder
  for (const valUnderInner of full.slice(index + 1)) {
    sum += valUnderInner
    result *= valUnderInner
    for (const valUnderDeep of full.slice(index + 2)) {
      sum += valUnderDeep
      if (sum < 2020) {
        sum -= valUnderDeep
        continue
      } else if (sum > 2020) {
        sum -= valUnderDeep
        break
      }
      result *= valUnderDeep
      found = true
      console.log(valUnder, valUnderInner, valUnderDeep)
      break
    }
    if (found) {
      break
    }
    if (!found) {
      sum -= valUnderInner
      result = result / valUnderInner
    }
  }
  if (found) {
    break
  }
}

console.log('2 $ ', result)