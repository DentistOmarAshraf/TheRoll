import mongoose, { Schema } from "mongoose";
const SubFieldSchema = new Schema({
    name: { type: String, required: true },
    label: { type: String, required: true },
    type: { type: String, required: true },
    option: [{ type: String }],
});
const FieldSchema = new Schema({
    name: { type: String, required: true },
    legend: { type: String, required: true },
    repet: { type: Boolean, required: true },
    sub: [SubFieldSchema], // embedded array of subfields
});
export const Fields = mongoose.model("Fields", FieldSchema);
//# sourceMappingURL=fields.js.map