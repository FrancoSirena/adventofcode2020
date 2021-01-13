
"use strict";
const fs = require("fs");
const path = require("path");

const input = fs.readFileSync(path.join(__dirname, "day9.input")).toString();
// const input = fs.readFileSync(path.join(__dirname, 'day9-sample.input')).toString()

const arr = input.split("\n");

/// part 1
let preambleSize = 25
let from = 25
let result
let nArr = Array.from(arr, (v, i) => ({
  v: Number(v), used: false, i
}))

function hasMatch(preamble, pos, look) {
  const searchingArr = preamble.slice(0, pos).slice(-preambleSize);
  let match = false
  let i = 0
  while (i < preambleSize && i < searchingArr.length) {
    const found = searchingArr.findIndex(({v}) => v === look - searchingArr[i].v)
    if (found > -1 && found != i) {
      nArr[searchingArr[found].i].used = true;
      nArr[searchingArr[i].i].used = true;
      match = true
      break;
    }
    i++
  }

  return match
}

while (true && from < arr.length) {
  result = nArr[from].v
  const matched = hasMatch(nArr, from, result)

  if (!matched) {
    break
  }
  from += 1
}

// 466456641
console.log('1 $', result)

const acc = new Map()
const looking = 466456641
from = 0

function accumulate(curr) {
  let found = null
  const clone = new Map(acc)
  for (const [key, val] of clone.entries()) {

    acc.set(key, {
      sum: val.sum + curr,
      pos: val.pos.concat(curr)
    })
    if (key !== looking && acc.get(key).sum === looking) {
      found = key
      break
    } else if (acc.get(key).sum > looking) {
      acc.delete(key)
    }
  }
  return found
}

let found

while (true && from < arr.length) {
  found = accumulate(Number(arr[from]))
  if (found) {
    break
  }
  acc.set(from, {
    sum: Number(arr[from]),
    pos: [Number(arr[from])]
  })
  from++
}
const sorted = acc.get(found).pos.sort((a , b) => a -b)
console.log('2 $ ', sorted[0] + sorted.slice(-1)[0])