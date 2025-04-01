import config from "./config.js";
import express from "express";
import cors from "cors";
import connect from "./db/mongo.js";
import userRoutes from "./routes/userRoutes.js";
import trailRoutes from "./routes/trailRoutes.js";

(async () => {
  const app = express();
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  await connect();

  app.use('/api/users', userRoutes);
  app.use('/api/trails', trailRoutes);

  app.listen(config.PORT, () => {
    console.log(`Server is running on port ${config.PORT}`);
  });

  app.get('/', (req, res) => {
    res.send('Hello');
  });
})();