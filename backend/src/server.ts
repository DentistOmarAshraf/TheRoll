import mongoose from "mongoose";
import templateDAO from "./DAO/daos/templateDAO.js";
// import fieldDAO from "./DAO/daos/fieldsDAO.js";
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
  // fields_id = "68caf4707255a075fcd9d059"
  const deleted = await templateDAO.deleteTemplateById("68caf50dba63e1024e2c0bce");
  console.log(deleted);
})();
