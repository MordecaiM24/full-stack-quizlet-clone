import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import "dotenv/config.js";
import { userRouter } from "./routes/users.js";
import { flashcardRouter } from "./routes/flashcards.js";
import { getQA } from "./controllers/cards.js";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/qa", getQA);
app.use("/api/flashcards", flashcardRouter);
app.use("/api/users", userRouter);
app.get("/", (req, res, next) => {
  res.send("Hello world");
});

mongoose.connect(
  // `mongodb+srv://${process.env.ATLAS_ID}:${process.env.ATLAS_PASSWORD}@quizlet-clone.lyjaupf.mongodb.net/?retryWrites=true&w=majority`
  `mongodb+srv://mordecaim:!Ar84Dah@quizlet-clone.lyjaupf.mongodb.net/?retryWrites=true&w=majority`
);

app.listen(5000, () => {
  console.log("Server listening on port 5000...");
});
