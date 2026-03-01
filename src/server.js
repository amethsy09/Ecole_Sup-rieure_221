import http from "http";
import App from "./app.js";
import env from "./config/env.js";

const appInstance = new App().getApp();

const server = http.createServer(appInstance);
const PORT = env.PORT;
const URL = env.URI;

server.listen(PORT, () => {
  console.log(`Server running on ${URL}`);
});