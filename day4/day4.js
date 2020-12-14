"use strict";
const fs = require("fs");
const path = require("path");

const input = fs.readFileSync(path.join(__dirname, "day4.input")).toString();
// const input = fs.readFileSync(path.join(__dirname, 'day4-2-valid.input')).toString()

const arr = new Set(input.split("\n\n"));
const eyeColors = new Set('amb blu brn gry grn hzl oth'.split(' '))
const fields = new Map([
  ["byr", {required: true, name: "(Birth Year)", validator: v => Number(v) && Number(v) >= 1920 && Number(v) <= 2002}],
  ["iyr", {required: true, name: "(Issue Year)", validator: v => Number(v) && Number(v) >= 2010 && Number(v) <= 2020}],
  ["eyr", {required: true, name: "(Expiration Year)", validator: v => Number(v) && Number(v) >= 2020 && Number(v) <= 2030}],
  ["hgt", {required: true, name: "(Height)", validator: v => {
    const [valid, height, metric] = v.match(/(\d+)(cm|in)/) || []
    if (valid) {
      switch (metric) {
        case "cm":
          return Number(height) >= 150 && Number(height) <= 193;
        case "in":
          return Number(height) >= 59 && Number(height) <= 76;
        default:
          return false
      }
    }
    return false
  }}],
  ["hcl", {required: true, name: "(Hair Color)", validator: v => /^#(\d|\w){6}$/.test(v)}],
  ["ecl", {required: true, name: "(Eye Color)", validator: v => eyeColors.has(v)}],
  ["pid", {required: true, name: "(Passport ID)", validator: v => /^\d{9}$/.test(v)}],
  ["cid", {required: false, name: "(Country ID)"}],
]);

// part 1
let passports = 0

for (const pass of arr) {
  const passport = new Map(pass.replace(/\n/g, ' ').split(' ').map(v => v.split(':')))
  let valid = true;
  for (const [field, {required}] of fields) {
    if (required) {
      valid = valid && passport.get(field)
    }
  }
  if (valid) {
    passports++
  }
}

console.log('1 $', passports)

// part 1
passports = 0

for (const pass of arr) {
  const passport = new Map(pass.replace(/\n/g, ' ').split(' ').map(v => v.split(':')))
  let valid = true;
  for (const [field, {required, validator}] of fields) {
    if (required) {
      valid = valid && passport.get(field) && validator(passport.get(field))
    }
  }
  if (valid) {
    passports++
  }
}

console.log('2 $', passports)