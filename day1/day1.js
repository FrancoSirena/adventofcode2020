'use strict'
const fs = require('fs')
const path = require('path')

const input = fs.readFileSync(path.join(__dirname, 'day1.input')).toString()
// const input = fs.readFileSync(path.join(__dirname, 'day1-sample.input')).toString()

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


// part 2                         
const full = [...under, ...upper]

let result
found = undefined

for (const [index, valUnder] of full.entries()) {
  for (const valUnderInner of full.slice(index + 1)) {
    for (const valUnderDeep of full.slice(index + 2)) {
      const temp = valUnder + valUnderInner + valUnderDeep
      if (temp < 2020) {
        continue
      } else if (temp > 2020) {
        break
      }
      result = valUnderDeep
      found = true
      break
    }
    if (found) {
      result *= valUnderInner * valUnder
      break
    }
  }
  if (found) {
    break
  }
}

console.log('2 $ ', result)