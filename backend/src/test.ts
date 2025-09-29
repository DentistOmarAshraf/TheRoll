import Handlebars from "handlebars";

const text =`بناءا على طلب السيد {{#pritinder}}{{name}} و يحمل رقم {{id}}{{/pritinder}}

{{#pritinder}}{{gender}}{{/pritinder}}`;
const obj = { pritinder: { name: "عمر أشرف", id: "12345", gender: "male" } };

const temp = Handlebars.compile(text);

console.log(temp(obj));
