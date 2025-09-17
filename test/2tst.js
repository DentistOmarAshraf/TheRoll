#!/usr/bin/env node

import Handlebars from "handlebars";

const obj = {
  pritinder: { name: "someName", id: "1234", gender: "male" },
  respondent: {name: "otherOne", id: "1234", gender: "female"}
};

const temp = {
  text: "{{pritinder.verbs.obj}} name is {{pritinder.name}} and he is againist {{respondent.name}} {{respondent.verbs.obj}} id is {{respondent.id}}",
  verbs: {
    heshe: { male: "he", female: "she" },
    obj: {male: "his", female: "her"}
  },
};


const final = Object.fromEntries(Object.entries(obj).map(([k , v]) => {
  const {gender} = v;
  let verbs = {}
  Object.entries(temp.verbs).forEach(([k, v]) => {
    verbs = {...verbs, [k]: v[gender]}
  })
  return ([[k], {...v, verbs}])
}))

const t = Handlebars.compile(temp.text)
console.log(t(final))