import connectToDB from "./db.js";
import NeighborhoodServices from "./services/NeighborhoodServices.js";
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

  // @ts-ignore
  const ne = await NeighborhoodServices.updateNeighborhood({
    _id: "693458b4f74fae29dca1cff7",
    policeName: "e"
  });
  console.log(ne);
  process.exit();
})();
