"use strict";
const fs = require("fs");
const path = require("path");

const input = fs.readFileSync(path.join(__dirname, "day7.input")).toString();
// const input = fs.readFileSync(path.join(__dirname, 'day7-sample.input')).toString()
// const input = fs.readFileSync(path.join(__dirname, 'day7-sample-2.input')).toString()

const arr = new Set(input.split("\n"));

// part 1
const looking = "shinygold";

const bags = new Map();
for (const rule of arr) {
  const [firstBag, containedBags] = rule
    .replace(/bag(s)*|[.]|\s|(no other)/g, "")
    .split("contain");
  const otherBags = containedBags.split(",");
  bags.set(firstBag, bags.get(firstBag) || new Map());
  for (const bagRelation of otherBags) {
    const [count, ...relation] = bagRelation;
    const bag = relation.join("");
    if (!bag) {
      continue;
    }
    bags.set(bag, bags.get(bag) || new Map());
    bags.get(firstBag).set(
      bag,
      new Map([
        ["count", Number(count)],
        ["bag", bags.get(bag)],
      ])
    );
  }
}

// Our graph keeps the BAG and all its neighbors structured as
// REL_BAG: { COUNT: N, BAG: REF TO ROOT }

let found = 0;
// keeps track of which bags were already visited
// never visit the same bag twice
let visited = new Map();

function visit(check) {
  if (!check) {
    return false;
  }
  const [bag, neighbors] = check;
  // If any of its direct neighbors as it then it returns true
  if (neighbors.get(looking)) {
    visited.set(bag, true);
    return true;
  }
  // Loop through all its neighbors looking for the "looking" bag
  let hasIt = false;
  for (const [neighborBag, neighborRelation] of neighbors.entries()) {
    let contains = visited.get(neighborBag);
    if (contains === undefined) {
      contains = visit([neighborBag, neighborRelation.get("bag")])
      visited.set(
        neighborBag,
        contains
      );
    }
    if (contains) {
      hasIt = true;
      break;
    }
  }
  visited.set(bag, hasIt);
  return hasIt;
}

const list = bags.entries();
let item = list.next();
while (!item.done) {
  if (visited.get(item.value[0]) || (item.value[0] !== looking && visit(item.value))) {
    found++;
  }
  item = list.next();
}

// right answer 226
console.log("1 $", found);

// part 2 - sample 126
item = bags.get(looking);
let total = 0;

// loops through all "looking" bag relations and dive down their deps
// calculate how many times that item exists in the current loop
// always keeping track of how many it had so far.
function visit2(listbag, times) {
  let bagTotal = 0;
  for (const bag of listbag) {
    const count = Number.isNaN(bag.get("count")) ? 0 : bag.get("count");
    bagTotal += times * count;
    if (bag.get("bag").size > 0) {
      bagTotal += visit2(bag.get("bag").values(), times * count);
    }
  }
  return bagTotal;
}

total = visit2(item.values(), 1);

// right answer 9569
console.log("2 $", total);
