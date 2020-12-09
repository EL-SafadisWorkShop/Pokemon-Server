const express = require("express");
//const bodyParser = require('body-parser');
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const fs = require("fs");
const cors = require("cors");
const app = express();
const port = 3001;

let rawData = fs.readFileSync("jsonData.json");
let jsonData = JSON.parse(rawData);

//use cors
app.use(cors());

//Loging all requests

app.get("/", (req, res) => {
  res.send("jsonData", "<h1>Hello</h1>");
});

// get pokemon by id
app.get("/pokemon/:id", (req, res) => {
  const pokemonId = req.params.id;
  const pokemon = jsonData.find((_item) => _item.id === parseInt(pokemonId));
  if (pokemon) {
    res.json(pokemon);
  } else {
    res.json({ message: `Pokemon ${pokemonId} doesn't exist` });
  }
  console.log("Working");
});

// get pokemon name by id
app.get("/pokemon/:id/:info", (req, res) => {
  const pokemonId = req.params.id;
  const pokemon = jsonData.find((_item) => _item.id === parseInt(pokemonId));
  if (pokemon) {
    res.json(pokemon.name.english);
  } else {
    res.json({ message: `Pokemon ${pokemonId} doesn't exist` });
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
