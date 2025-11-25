import sectionDAO from "./DAO/daos/sectionsDAO.js";
import templateDAO from "./DAO/daos/templateDAO.js";
import fieldDAO from "./DAO/daos/fieldsDAO.js";
import connectToDB from "./db.js";

(async () => {
  await connectToDB();
  try {
    const dt = await fieldDAO.createNewField({
      name: "lawyers",
      legend: "محامين",
      repet: true,
      sub: [
        { name: "name", label: "السيد المحامي", type: "text" },
        { name: "address", label: "محله المختار", type: "text" },
      ],
    });
    console.log(dt);
  } catch (e) {
    console.log(e);
  }
})();
