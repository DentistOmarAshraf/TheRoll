import connectToDB from "./db.js";
import redisClient from "./cashClient.js";
import express from "express";
import cors from "cors";
// import rateLimit from "express-rate-limit";
import filedRoutes from "./routes/fieldRoutes.js";
import sectionsRoutes from "./routes/sectionsRoutes.js";
import templateRoutes from "./routes/templateRoutes.js";
import gloablErrorHandler from "./middlewares/GloablErrorHandler.js";
import notFoundHandler from "./middlewares/NotFoundHandler.js";

// Setup Express server
const app = express();
app.use(express.json());
app.use(cors({ origin: ["http://localhost:8080"] }));

// const limiter = rateLimit({
//   windowMs: 1 * 60 * 1000,
//   max: 4,
//   message: 'Too many requests from this IP, please try again after 15 minutes',
//   standardHeaders: true,
//   legacyHeaders: false,
// });

// app.use(limiter)

// Registration of Endpoint
filedRoutes(app);
sectionsRoutes(app);
templateRoutes(app);

// Testing Email concept here
// This will be in controller

// app.get("/test", async (req: Request, res: Response) => {
//   try {
//     await SendConfirmEmail({
//       userName: "omar ashraf",
//       userEmail: "omar_ashraf@msn.com",
//       token: "1234",
//     });
//   } catch (e) {
//     throw new ServerError(`server error: ${e}`);
//   }
//   return res.status(200).json({ hi: "there" });
// });

// app.get("/forget", async (req: Request, res: Response) => {
//   try {
//     await SendForgetPassEmail({
//       userEmail: "omar_ashraf@live.com",
//       token: "1234",
//     });
//   } catch (e) {
//     throw new ServerError(`server error: ${e}`);
//   }
//   return res.status(200).json({ hi: "there 2" });
// });

// Not Found method
app.use(notFoundHandler);

// Server Error
app.use(gloablErrorHandler);

(async () => {
  try {
    await connectToDB();
    await redisClient.connect();
    console.log("Connected to redis");
    app.listen(5000, "0.0.0.0", () => {
      console.log(`SERVER STARTED ON PORT 5000`);
    });
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
})();
