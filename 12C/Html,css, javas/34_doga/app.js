import express from "express";
const app = express();
app.use(express.json());

const fak = [
  { name: "fenyő", category: "karácsonyi", price: 1000, isEvergreen: true },
  { name: "bükk", category: "erdei", price: 500, isEvergreen: true },
  { name: "akasztó", category: "játékbel", price: 2000, isEvergreen: false },
];

app.get("/trees", (req, res) => {
  res.json(fak);
});

app.get("/trees/:id", (req, res) => {
  const id = req.params.id;
  if (id < 0 || id > fak.length) {
    return res.status(404).json({ message: "Nem található index" });
  }
  res.status(200).json(fak[id]);
});

app.post("/trees", (req, res) => {
  const { name, category, price, isEvergreen } = req.body;
  if (!name || !category || !price || isEvergreen == null) {
    return res.status(400).json({ message: "Hibás bemeneti adat" });
  }
  const newFa = { name, category, price, isEvergreen };
  fak.push(newFa);
  res.status(201).json({ message: "Létrehozott sikeresen" });
});

app.put("/trees/:id", (req, res) => {
  const id = req.params.id;
  if (id < 0 || id > fak.length) {
    return res.status(404).json({ message: "Nem található index" });
  }
  const { name, category, price, isEvergreen } = req.body;
  if (!name || !category || !price || isEvergreen == null) {
    return res.status(400).json({ message: "Hibás bemeneti adat" });
  }
  fak[id] = { name, category, price, isEvergreen };
  res.status(200).json(fak[id]);
});

app.delete("/trees/:id", (req, res) => {
  const id = req.params.id;
  if (id < 0 || id > fak.length) {
    return res.status(404).json({ message: "Nem található index" });
  }
  fak.splice(id, 1);
  res.status(201).json({ message: "Deleted succesfully" });
});

app.listen(3010, () => {
  console.log("server runs on 3010");
});
