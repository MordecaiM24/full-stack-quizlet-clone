import jwt from "jsonwebtoken";
import bcrypt, { hash } from "bcrypt";
import { UserModel } from "../models/User.js";
import "dotenv/config";

const createUser = async (req, res) => {
  const { username, password } = req.body;
  const user = await UserModel.findOne({ username }); // key value are the same, just passing key

  if (user) {
    return res.json({ msg: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  console.log(hashedPassword);
  const newUser = new UserModel({ username, password: hashedPassword });
  await newUser.save();

  res.json({ msg: "User registered successfully" });
};

const login = async (req, res) => {
  const { username, password } = req.body;
  console.log(username);
  const user = await UserModel.findOne({ username });
  console.log(user._id);

  if (!user) {
    return res.json({ msg: "User doesn't exist" });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.json({ msg: "Username or password is incorrect" });
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  res.json({ token, userID: user._id });
};

export { createUser, login };
