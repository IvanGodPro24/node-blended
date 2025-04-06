import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UsersCollection } from "../db/models/User.js";
import { env } from "../utils/env.js";

export const findUserByEmail = (email) => UsersCollection.findOne({ email });

export const updateUserWithToken = async (userId) => {
  const token = jwt.sign({ id: userId }, env("JWT_SECRET"));

  const newUser = await UsersCollection.findOneAndUpdate(
    { _id: userId },
    { token },
    { new: true }
  );

  return newUser;
};

export const createUser = async (userData) => {
  const { password } = userData;

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await UsersCollection.create({
    ...userData,
    password: hashedPassword,
  });

  const newUser = await updateUserWithToken(user._id);

  return newUser;
};

export const findUserById = (userId) => UsersCollection.findById(userId);

export const logoutUser = async (userId) => {
  await UsersCollection.findByIdAndUpdate(userId, { token: "" });
};
