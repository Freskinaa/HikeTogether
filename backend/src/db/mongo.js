import mongoose from "mongoose";
import config from "../config.js";


//connection with mongodb
async function connect() {
  try {
    await mongoose.connect(config.MONGO_URI);
    console.log("Connected to MongoDB");

    mongoose.connection.on("error", (err) => {
      console.error("Error in MongoDB connection", err);
    });
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
  }
}

export default connect;
