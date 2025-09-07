import { Server } from "http";
import app from "./app";
import mongoose from "mongoose";
import config from "./config";

let server: Server;

async function main() {
  try {
    await mongoose.connect(`${config.database_url}`);
    server = app.listen(config.port, () => {
      console.log(`Server is running on port ${config.port}`);
    });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

main();
