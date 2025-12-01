import connectToDB from "./db.js";
import CityDAO from "./DAO/CityDAO.js";

(async () => {
  try {
    await connectToDB();
    const x = await CityDAO.getById("692d6840ce1a0e4b5245b6d6");
    console.log(typeof x?.createdAt);
  } catch (e) {
    console.log(e);
  }
})();
