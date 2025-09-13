import fs from "fs/promises"

const file = "./notes.json";

export async function readNotes() {
    try {
        const data = await fs.readFile(file, "utf-8")
        return JSON.parse(data);
    }
    catch (err) {
        console.error("Error reading notes:", err);
    }
}

export async function writeNotes(notes) {
  await fs.writeFile(file, JSON.stringify(notes, null, 2));
}

export async function getNotes(req, res) {
  const notes = await readNotes();
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify(notes));
}

export async function getNoteById(req, res, id) {
    const notes = await readNotes();
    const note = notes.find(n => n.id === parseInt(id));
    return note;
}

export async function deleteNote(req,res,id){
    const notes = await readNotes();
    const note = await getNoteById(req,res,id);
    if (!note) {
        res.writeHead(404, { "Content-Type": "application/json" });
        return res.end(JSON.stringify({ message: "Note not found" }));
    }
    
    const filteredNotes = notes.filter(n => n.id !== parseInt(id));
    await writeNotes(filteredNotes);

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({
    message: "Note deleted",
    content: note
    }));
    
}

export async function addNote(req, res) {
  let body = "";

  req.on("data", chunk => {
    body += chunk.toString();
  });

  req.on("end", async () => {
    try {
      const { title, content } = JSON.parse(body);
      const notes = await readNotes();
      const lastId = notes.length ? notes[notes.length - 1].id : 0;
      const newNote = { id: lastId+1 ,title, content , created_at: new Date().toISOString()};
      notes.push(newNote);
      writeNotes(notes);

      res.writeHead(201, { "Content-Type": "application/json" });
      res.end(JSON.stringify(newNote));
    } catch (err) {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Invalid JSON" }));
    }
  });
}
