import connectToDB from "./db.js";
import { CityDAO } from "./DAO/BaseDAO.js";

(async () => {
  await connectToDB();
  const x = await CityDAO.updateById("692f1eacd2cb5ba75b71d164", {name: "Monera"});
  console.log(x);
})();
