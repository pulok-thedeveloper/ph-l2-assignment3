import { Server } from "http";
import app from "./app";
import mongoose from "mongoose";

let server: Server;
const PORT = process.env.PORT || 5000;
const URI =
  "mongodb+srv://dbUser1:880032a3e0@cluster0.tftz42f.mongodb.net/library-management?retryWrites=true&w=majority&appName=Cluster0";

async function main() {
  try {
    await mongoose.connect(`${URI}`);
    server = app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

main();
