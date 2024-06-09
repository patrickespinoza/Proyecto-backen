const cors = require("cors");
const express = require("express");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (request, response) => {
  response.json({
    message: "proyecto backend APIv1",
  });
});

module.exports = app;
