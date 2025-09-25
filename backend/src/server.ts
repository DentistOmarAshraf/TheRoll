import connectToDB from "./db.js";
import express from "express";
import cors from "cors";
import filedRoutes from "./routes/fieldRoutes.js";
import sectionsRoutes from "./routes/sectionsRoutes.js";
import templateRoutes from "./routes/templateRoutes.js";
import gloablErrorHandler from "./middlewares/GloablErrorHandler.js";
import notFoundHandler from "./middlewares/NotFoundHandler.js";

// Setup Express server
const app = express();
app.use(express.json());
app.use(cors());

// Registration of Endpoint
filedRoutes(app);
sectionsRoutes(app);
templateRoutes(app);

// Not Found method
app.use(notFoundHandler);

// Server Error
app.use(gloablErrorHandler);

(async () => {
  await connectToDB();
  app.listen(5000, "0.0.0.0", () => {
    console.log("server Started");
  });
})();
