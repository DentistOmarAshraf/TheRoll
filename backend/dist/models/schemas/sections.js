import mongoose, { Schema } from "mongoose";
const sectionsSchema = new Schema({
    name: { type: String, required: true },
});
export const Sections = mongoose.model("Sections", sectionsSchema);
//# sourceMappingURL=sections.js.map