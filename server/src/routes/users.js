import express from "express";
import { login, createUser } from "../controllers/users.js";
const router = express.Router();

router.post("/register", createUser);

router.post("/login", login);

export { router as userRouter };
