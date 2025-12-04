import connectToDB from "./db.js";
// import { CityDAO } from "./DAO/ModelDAO.js";
import { NeighborhoodDAO } from "./DAO/ModelDAO.js";
import type { CastError } from "mongoose";
// import { Types } from "mongoose";

(async () => {
  await connectToDB();
  // const city = await CityDAO.getById("6931c1a59f439625e65e7d95");
  // if (!city) {
  //   process.exit(0);
  // }
  // const ne = await NeighborhoodDAO.create({
  //   city,
  //   name: "المقطم",
  //   policeName: "قسم شرطه المقطم",
  // });
  // console.log(city);
  // console.log(ne);

  const nes = await NeighborhoodDAO.getOneByQuery({
    city: "6931c1a59f439625e65e7d95",
  });
  console.log(nes);
  process.exit();
})();
