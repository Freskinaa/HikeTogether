import config from "./config.js";
import express from "express";
import cors from "cors";
import connect from "./db/mongo.js";

(async () => {
  const app = express();
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  await connect();

  app.listen(config.PORT, () => {
    console.log(`Server is running on port ${config.PORT}`);
  });
})();