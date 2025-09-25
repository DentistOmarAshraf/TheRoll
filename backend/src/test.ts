import { Sections } from "./models/schemas/sections.js";
import { Fields } from "./models/schemas/fields.js";
import fieldDAO from "./DAO/daos/fieldsDAO.js";
import connectToDB from "./db.js";

(async () => {
  await connectToDB();
  const t = await fieldDAO.createNewField({
    name: "pritinder",
    legend: "مدعي",
    repet: false,
    sub: [
      { name: "name", label: "اسم", type: "text" },
      { name: "id", label: "رقم قومي", type: "text" },
      {
        name: "gender",
        label: "جنس",
        type: "select",
        option: ["male", "female"],
      },
    ],
  });
  console.log(t);
})();

export { Sections, Fields };
