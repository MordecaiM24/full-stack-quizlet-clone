import express from "express";
const router = express.Router();
import {
  createSet,
  getPublicSets,
  getSetByID,
  editFlashcard,
} from "../controllers/cards.js";

router.get("/", getPublicSets);

router.get("/:id", getSetByID);

router.post("/", createSet);

router.patch("/:id", editFlashcard);

export { router as flashcardRouter };
