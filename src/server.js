import http from "http";
import App from "./app.js";

const appInstance = new App().getApp();

const server = http.createServer(appInstance);
const PORT = process.env.PORT || 3000;
const URL = process.env.URI;

server.listen(PORT, () => {
  console.log(`Server running on ${URL}`);
});
