import connectToDB from "./db.js";
// import { CityDAO } from "./DAO/ModelDAO.js";
import { CityDAO, NeighborhoodDAO, UniversityDAO, UserDAO, UserLawyerDAO, UserStudentDAO } from "./DAO/ModelDAO.js";
import type { CastError } from "mongoose";
import type { ICity } from "./interfaces/city/ICity.js";
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

  const city = await CityDAO.getById("6931c1a59f439625e65e7d95");
  if (!city) {
    console.log("city not found");
    process.exit(1);
  }
  console.log(city);

  const ci = await CityDAO.getByIdWithOption("6931c1a59f439625e65e7d95", ["universities"]);
  console.log(ci);

  const ne = await NeighborhoodDAO.getByIdWithOption("6932816df41db66fde023270", ["city"]);
  console.log((ne?.city as ICity).name)
  // const neighborhood = await NeighborhoodDAO.create({
  //   name: "المقطم",
  //   city,
  //   policeName: "قسم شرطه المقطم",
  // });
  // if (!neighborhood) {
  //   console.log("Error in Neighborhood creation");
  // }
  // const updated = await CityDAO.atomicUpdate("6931c1a59f439625e65e7d95", {
  //   $push: { neighborhoods: neighborhood },
  // });
  // console.log("pushed !!", updated);
  // process.exit(0);
})();
