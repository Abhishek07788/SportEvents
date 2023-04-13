const express = require("express");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hii, This is the PLAYO-APP backend");
});

app.listen(8080, ()=>{
    console.log("started at: http://localhost:8080");
})
