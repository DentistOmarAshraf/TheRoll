import mongoose, { Schema, Types } from "mongoose";
const templateSchema = new Schema({
    section: { type: Types.ObjectId, ref: "Sections", required: true },
    title: { type: String, required: true },
    intro: String,
    middle: String,
    final: String,
    summary: String,
    fields: [{ type: Types.ObjectId, ref: "Fields" }],
});
export const Templates = mongoose.model("Templates", templateSchema);
//# sourceMappingURL=tmeplates.js.map