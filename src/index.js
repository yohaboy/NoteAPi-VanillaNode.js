import http from "http";
import routes from "./routes/routes.js";

const PORT = 5173;

const server = http.createServer((req, res) => {
  routes(req, res);
});

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
