const fs = require('fs')
const path = require('path')

const [day] = process.argv.slice(2);

fs.mkdirSync(day)
fs.writeFileSync(path.join(__dirname, day, `${day}.js`), `
"use strict";
const fs = require("fs");
const path = require("path");

// const input = fs.readFileSync(path.join(__dirname, "${day}.input")).toString();
const input = fs.readFileSync(path.join(__dirname, '${day}-sample.input')).toString()

const arr = input.split("\\n");
`)
fs.writeFileSync(path.join(__dirname, day, `${day}.input`))
fs.writeFileSync(path.join(__dirname, day, `${day}-sample.input`))
