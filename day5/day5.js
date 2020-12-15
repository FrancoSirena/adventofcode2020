'use strict'
const fs = require('fs')
const path = require('path')

const input = fs.readFileSync(path.join(__dirname, 'day5.input')).toString()
// const input = fs.readFileSync(path.join(__dirname, 'day5-sample.input')).toString()

const arr = new Set(input.split('\n'))

const ROWS = Array.from({ length: 128 }, (_, i) => i)
const COLUMNS = Array.from({ length: 8 }, (_, i) => i)
let seatID = 0

function getId(r, c) {
  return r * 8 + c
}

//part 1
for (const seat of arr) {
  const [row] = seat.split('').slice(0, -3).reduce((acc, pointer) => {
    switch (pointer) {
      case "B":
        return acc.slice(Math.ceil(acc.length / 2));
      case "F":
        return acc.slice(0, Math.floor(acc.length / 2));
      default:
        return acc;
    }
  }, ROWS);

  const [col] = seat.split('').slice(-3).reduce((acc, pointer) => {
    switch (pointer) {
      case "R":
        return acc.slice(Math.ceil(acc.length / 2));
      case "L":
        return acc.slice(0, Math.floor(acc.length / 2));
      default:
        return acc;
    }
  }, COLUMNS);
  const id = getId(row,col)
  if (id > seatID) {
    seatID = id
  }
}

console.log('1 $ ', seatID)

// part 2
seatID = 0
const seatsTaken = new Map()
for (const seat of arr) {
  const [row] = seat.split('').slice(0, -3).reduce((acc, pointer) => {
    switch (pointer) {
      case "B":
        return acc.slice(Math.ceil(acc.length / 2));
      case "F":
        return acc.slice(0, Math.floor(acc.length / 2));
      default:
        return acc;
    }
  }, ROWS);

  const [col] = seat.split('').slice(-3).reduce((acc, pointer) => {
    switch (pointer) {
      case "R":
        return acc.slice(Math.ceil(acc.length / 2));
      case "L":
        return acc.slice(0, Math.floor(acc.length / 2));
      default:
        return acc;
    }
  }, COLUMNS);
  const id = getId(row,col)
  if (!seatsTaken.get(id - 1)) {
    seatsTaken.set(id - 1, false)
  }
  if (!seatsTaken.get(id + 1)) {
    seatsTaken.set(id + 1, false)
  }
  seatsTaken.set(id, true)
}

console.log('2 $ ', [...seatsTaken.entries()].filter(([_, v]) => !v)[1][0])