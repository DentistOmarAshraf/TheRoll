import connectToDB from "./db.js";
import NeighborhoodServices from "./services/NeighborhoodServices.js";
import CityServices from "./services/CityServices.js";
import UniversityServices from "./services/UniversityServices.js";
import UserServices from "./services/UserServices.js";
import redisClient from "./cashClient.js";
import type { IStudentUser } from "./interfaces/user/IUser.js";
// import { NeighborhoodDAO } from "./DAO/ModelDAO.js";

(async () => {
  await connectToDB();
  await redisClient.connect();
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

  // const un = await UniversityServices.createUniversity({
  //   city: "6931c1a59f439625e65e7d95",
  //   name: "القاهره",
  // });
  // console.log(un);

  const user = await UserServices.createUser<"Lawyer">({
    type: "Lawyer",
    fullName: "عمر اشرف",
    email: "omar@live.com",
    password: "1234",
    phone: "+201017815609",
    // university: "693821a043f65f377d3579b6",
    // grade: "1",
    city: "6931c1a59f439625e65e7d95",
    neighborhood: "6938206cfdaa82d3dfa278b0",
    syndicateId: "12345",
  });
  console.log(user);
})();
