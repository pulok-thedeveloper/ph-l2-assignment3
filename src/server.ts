import { Server } from "http";
import app from "./app";
import mongoose from "mongoose";

let server: Server;
const PORT = process.env.PORT || 5000;
const URI = process.env.URI || "mongodb://localhost:27017";

async function main() {
  try {
    await mongoose.connect(URI);
    server = app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

main();

