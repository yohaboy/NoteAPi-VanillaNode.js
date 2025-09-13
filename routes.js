import { getNotes, addNote } from "./controller.js";
import url from "url";

const routes = (req, res) => {
  const parsedUrl = url.parse(req.url, true);

  if (req.method === "GET" && parsedUrl.pathname === "/notes") {
    getNotes(req, res);
  } else if (req.method === "POST" && parsedUrl.pathname === "/notes") {
    addNote(req, res);
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Not Found" }));
  }
};

export default routes;
