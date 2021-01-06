"use strict";
const fs = require("fs");
const path = require("path");

const input = fs.readFileSync(path.join(__dirname, "day8.input")).toString();
// const input = fs.readFileSync(path.join(__dirname, 'day8-sample.input')).toString()

const arr = input.split("\n");

const visited = []

function loop(from = 0, first = true) {
  let pos = from;
  let acc = 0;
  let run = true;
  
  let ran = new Set();
  
  while (run) {
    const [ins, val] = arr[pos].split(' ');
    if (ran.has(pos)) {
      run = false
      break
    }
    first && visited.unshift([ins, val, pos])
    ran.add(pos)
    if (ins === 'nop') {
      pos++
    } else if (ins === 'acc') {
      acc += Number(val)
      pos++
    } else {
      pos += Number(val)
    }
    run = pos <= arr.length - 1 && pos >= 0;
  }

  return [acc, pos === arr.length]
}
const [result] = loop()
console.log('1 $', result)

// missing part 2

function switchVal(posToChange) {
  const [ins, val] = arr[posToChange].split(' ')
  const newIns = ins === 'jmp' ? 'nop' : 'jmp'
  arr[posToChange] = [newIns, val].join(' ')
}

function getPos() {
  let val = visited.shift()
  while (val && val[0] === 'acc') {
    acc -= Number(val[1])
    val = visited.shift()
  }
  return val && val[2]
}

let run = true
let [acc] = loop()
let pos = getPos()
switchVal(pos)

while (pos && run) {
  const [lastAcc, finished] = loop(pos, false)
  if (finished) {
    acc += lastAcc
    break
  }
  switchVal(pos)
  pos = getPos()
  switchVal(pos)
  run = !finished
}

console.log('2 $', acc)