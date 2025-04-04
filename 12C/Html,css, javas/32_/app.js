import express from "express";

const app = express();
app.use(express.json());

const tasks = [
  { name: "Adam", task: "Hoovering", isDone: false },
  { name: "Adam2", task: "Hoovering2", isDone: false },
  { name: "Adam3", task: "Hoovering3", isDone: true },
];

app.get("/tasks", (req, res) => {
  res.status(200).json(tasks);
});

app.get("/tasks/:id", (req, res) => {
  const id = req.params.id;
  if (id < 0 || id > tasks.length) {
    return res.status(404).json({ message: "nem található" });
  }
  res.status(200).json(tasks[id]);
});

app.post("/tasks", (req, res) => {
  const { name, task, isDone } = req.body;
  if (!name || !task || isDone == null) {
    res.status(400).json({ message: "Missing input" });
  }
  const newTask = { name, task, isDone };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

app.put("/tasks/:id", (req, res) => {
  const id = req.params.id;
  if (id < 0 || id > tasks.length) {
    return res.status(404).json({ message: "nem található" });
  }
  const { name, task, isDone } = req.body;
  if (!name || !task || isDone == null) {
    res.status(400).json({ message: "Missing input" });
  }
  tasks[id] = { name, task, isDone };
  res.status(200).json(tasks[id]);
});

app.delete("/tasks/:id", (req, res) => {
  const id = req.params.id;
  if (id < 0 || id > tasks.length) {
    return res.status(404).json({ message: "nem található" });
  }
  tasks.splice(id, 1);
  res.status(200).json({ message: "deleted" });
});

app.listen(3000, () => {
  console.log("Server 3000 run");
});
