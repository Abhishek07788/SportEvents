const express = require("express");
const cors = require("cors");
const dbConnect = require("./config/db");
const UserRouter = require("./Routes/user.routes");

const app = express();
app.use(express.json());
app.use(cors());
app.use("/users", UserRouter);

app.use("/", (req, res) => {
  res.send("Hii, this is the SportEvents backend");
});

app.listen(8080, async () => {
  await dbConnect();
  console.log("Stared at http://localhost:8080");
});
