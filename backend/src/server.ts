import mongoose, { Types } from "mongoose";
import templateDAO from "./DAO/daos/templateDAO.js";
import fieldDAO from "./DAO/daos/fieldsDAO.js";
// import sectionDAO from "./DAO/daos/sectionsDAO.js";

async function connectToDB(): Promise<void> {
  try {
    await mongoose.connect("mongodb://localhost/SomeDBN");
    console.log("Connected");
  } catch (e) {
    console.log(e);
  }
}

(async () => {
  await connectToDB();
  // const newSec = await sectionDAO.createNewSection({name: "الاحوال"})
  // console.log(newSec);
  // section_id = "68caf417bfc1b3f5de73df4a"
  // fields_id = "68caf4707255a075fcd9d059"c
  const f = await fieldDAO.getFieldById("68caf4707255a075fcd9d059");
  console.log(f)
  const sec_id = new Types.ObjectId("68caf417bfc1b3f5de73df4a")
  const tem = await templateDAO.getTemplatesBySectionID(sec_id, 1, 10);
  console.log(JSON.stringify(tem, null, 2));
})();
