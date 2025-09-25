import { Types } from "mongoose";
import { Sections } from "./models/schemas/sections.js";
import { Fields } from "./models/schemas/fields.js";
import type { ITemplateDAO } from "./DAO/interfaces/ITemplateDAO.js";
import connectToDB from "./db.js";
import templateDAO from "./DAO/daos/templateDAO.js";

(async () => {
  await connectToDB();
  const dt: ITemplateDAO = {
    section: new Types.ObjectId("68cecf8f91df1bec7f432542"),
    title: "Some Title",
    fields: [new Types.ObjectId("68caf4707255a075fcd9d059")],
    tags: ["مدني", "انذارات"],
    verbs: {heshe: {male: "he", female: "female"}, hisher: {male: "his", female: "her"}}
  };
  const data = await templateDAO.createNewTemplate(dt);
  console.log(data);
  process.exit(0)
})();

export { Sections, Fields };
