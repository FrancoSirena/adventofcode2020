'use strict'
const fs = require('fs')
const path = require('path')

const input = fs.readFileSync(path.join(__dirname, 'day3.input')).toString()
// const input = fs.readFileSync(path.join(__dirname, 'day3-sample.input')).toString()

const arr = input.split('\n')
const TREE = '#'

// part 1
const moveX = 3;
const moveY = 1;

let posX = moveX;
let posY = moveY;

let trees = 0

while (posY < arr.length) {
  const row = arr[posY].split('')
  const stablePos = posX % row.length
  const found = row[stablePos] === TREE
  if (found) {
    trees++
  }
  posX += moveX
  posY += moveY
}

console.log('1 $ ', trees)

//part 2
const slopes = new Map([['a', [1,1]], ['b', [3,1]], ['c',[5,1]], ['d', [7,1]], ['e', [1,2]]])
const pos = new Map(slopes)
let totalTrees = 1;
let move = true

while (move) {
  for (const [slope, [moveX, moveY]] of slopes) {
    if (!pos.get(slope)) {
      continue
    }
    let [posX, posY, trees = 0] = pos.get(slope)
    const row = arr[posY].split('')
    const stablePos = posX % row.length
    const found = row[stablePos] === TREE
    if (found) {
      trees++
    }
    posX += moveX
    posY += moveY
    if (posY >= arr.length) {
      totalTrees *= trees
      pos.delete(slope)
    } else {
      pos.set(slope, [posX, posY, trees])
    }
  }
  move = pos.size > 0
}

console.log('2 $ ', totalTrees)