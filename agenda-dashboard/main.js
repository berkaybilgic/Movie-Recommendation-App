const express = require("express");
const app = express();


const Agenda = require("agenda");
const Agendash = require("agendash");

// @ts-ignore
const agenda = new Agenda({ db: { address: "mongodb://mongo:27017/agenda" } });

app.use("/dash", Agendash(agenda));


app.listen(8080, () => {
    console.log("Server is up on port " + 8080);
  });