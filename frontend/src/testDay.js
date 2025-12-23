#!/usr/bin/env node

import daysjs from "dayjs";
import utc from "dayjs/plugin/utc.js";
import "dayjs/locale/ar.js";

// console.log(daysjs().day());
daysjs.extend(utc);
const days = new Map([
  [1, "mon"],
  [2, "tue"],
  [3, "wed"],
  [4, "thu"],
  [5, "fri"],
  [6, "sat"],
  [7, "sun"],
]);

console.log(daysjs().utc().format());
