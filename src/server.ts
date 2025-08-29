import { Server } from "http";
import app from "./app";

let server: Server;
const port = 5000;

const bootstrap = async () => {
  server = app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
};

bootstrap();
