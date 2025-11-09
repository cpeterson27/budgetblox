const express = require("express");
const mongoose = require("mongoose");
const usersRouter = require("./routes/users");
const { sendNotFound } = require("./utils/errors");

const { PORT = 3001 } = process.env;
const app = express();


mongoose.set("strictQuery", false);
mongoose
  .connect("mongodb://127.0.0.1:27017/budget blox")
  .then(() => {})
  .catch(console.error);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", usersRouter);

app.use((req, res) => {
res.status(sendNotFound).json({message: "Requested resource not found"});
});

app.listen(PORT, () => {});

module.exports = app;