import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";

const app = express();
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

mongoose
  .connect(
    "mongodb+srv://delvin:1234@chat-messenger.vgdrasi.mongodb.net/Chat-Messenger?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => app.listen(5001, () => console.log("Listening")))
  .catch((error) => console.log(error));
