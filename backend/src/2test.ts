import connectToDB from "./db.js";
import NeighborhoodServices from "./services/NeighborhoodServices.js";
import CityServices from "./services/CityServices.js";
import UniversityServices from "./services/UniversityServices.js";
// import { NeighborhoodDAO } from "./DAO/ModelDAO.js";

(async () => {
  await connectToDB();
  // try {
  //   const ne = await NeighborhoodServices.deleteNeighborhood(
  //     "69344d204700f63bc3f1a049",
  //     false
  //   );
  //   console.log(ne);
  // } catch (e) {
  //   console.log(e);
  // }
  // process.exit(1);
  const univ = await UniversityServices.deleteUniversity(
    "6934750de1c8c725b2f17cba"
  );
  console.log(univ);
})();
