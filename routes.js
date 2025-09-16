import { getNotes, addNote , editNote , deleteNote} from "./controller.js";
import url from "url";

const routes = (req, res) => {
  const parsedUrl = url.parse(req.url, true);

  if (req.method === "GET" && parsedUrl.pathname === "/notes") {
    getNotes(req, res);
  } else if (req.method === "POST" && parsedUrl.pathname === "/notes") {
    addNote(req, res);
  } else if (req.method === "PUT" && parsedUrl.pathname.match(/^\/notes\/\d+$/)) {
    editNote(req, res, parsedUrl.pathname.split("/")[2]);
  } else if (req.method === "DELETE" && parsedUrl.pathname.match(/^\/notes\/\d+$/)) {
    deleteNote(req, res, parsedUrl.pathname.split("/")[2]);
  }

  else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Not Found" }));
  }
};

export default routes;
