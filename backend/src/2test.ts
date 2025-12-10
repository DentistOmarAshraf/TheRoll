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

  // const user = await UserServices.createUser<"Lawyer">({
  //   type: "Lawyer",
  //   fullName: "عمر اشرف",
  //   email: "omar@live.com",
  //   password: "1234",
  //   phone: "+201017815609",
  //   // university: "693821a043f65f377d3579b6",
  //   // grade: "1",
  //   city: "6931c1a59f439625e65e7d95",
  //   neighborhood: "6938206cfdaa82d3dfa278b0",
  //   syndicateId: "12345",
  // });
  // console.log(user);

  // const up = await UserServices.resetPassword({
  //   token: "7c0a74d2-d438-4846-8488-be19fa11b8f8",
  //   password: "11111",
  // });
  // console.log(up);

  // const chk = await UserServices.checkUserPass({
  //   email: "omar@live.com",
  //   password: "11111",
  // });
  // console.log(chk);
  // const user = await UserServices.deleteUser("69386f39e858b5b154933463");
  // console.log(user);
  const u = await UserServices.confirmUser({
    token: "089935f1-f3fb-4869-b669-2605b54d7b74",
  });
  console.log(u);

  process.exit();
})();
