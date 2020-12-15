"use strict";
const fs = require("fs");
const path = require("path");

const input = fs.readFileSync(path.join(__dirname, "day6.input")).toString();
// const input = fs.readFileSync(path.join(__dirname, 'day6-sample.input')).toString()

const arr = input.split("\n\n");

// part 1
let answers = 0;
for (const group of arr) {
  const groupAnswers = new Set(group.replace(/\n/g, ""));
  answers += groupAnswers.size;
}

console.log("1 $ ", answers);

// part 2
answers = 0;
for (const group of arr) {
  const people = group.split("\n").length;
  const groupAnswers = group
    .replace(/\n/g, "")
    .split("")
    .reduce(
      (acc, answer) => ({
        ...acc,
        [answer]: (acc[answer] || 0) + 1,
      }),
      {}
    );
  answers += Object.values(groupAnswers).filter((v) => v === people).length;
}

console.log("2 $ ", answers);
