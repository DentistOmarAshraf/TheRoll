#!/usr/bin/env node

import Handlebars from "handlebars";

const Obj = {
  person: [{ first: "omar", last: "afifi", verb: { heshe: "he" } }, { first: "nada", last: "soliman", verb: { heshe: "she" } }],
};

const temp = {
  text: "{{#person}}what: {{first}} why: {{last}} and verb is {{verb.heshe}} {{/person}}{{#person}}{{first}} {{/person}}",
  verbs: { heshe: { male: "he", female: "she" } },
};

const t = Handlebars.compile(temp.text);

console.log(t(Obj));


// single and multipale object can be handled very well with handlebars !


