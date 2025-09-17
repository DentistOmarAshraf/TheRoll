#!/usr/bin/env node
import Handlebars from "handlebars";

const obj = { pritinder: [{ name: "omar", id: 1234, gender: "male" }] };

const temp = {
    text: "here are some example",
    verbs: {
        wants: {male: "يريد", female: "تريد"},
        give: {male: "يعطي", female: "تعطي"},
    }
}

const {verbs} = temp;

const x = obj.pritinder.map((item) => {
    let newObj = {}
    Object.entries(verbs).forEach(([k , v]) => {
        newObj = {...newObj, [k]: v[item.gender]}
    })
    return {...item, verbs: newObj}
})

console.log(x);