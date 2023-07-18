import express from "express";
import { verifyToken } from "../controllers/users.js";
import {
  createSet,
  getPublicSets,
  getSetByID,
  editFlashcard,
  autoCreate,
  getQA,
} from "../controllers/cards.js";

const router = express.Router();

router.get("/auto", autoCreate);

router.post("/qa", getQA);

router.get("/", getPublicSets);

router.get("/:id", getSetByID);

router.post("/", verifyToken, createSet);

router.patch("/:id", editFlashcard);

export { router as flashcardRouter };
