import bcrypt from "bcrypt";
import { UsersCollection } from "../db/models/User.js";
import { SessionsCollection } from "../db/models/Session.js";
import { createSession } from "../utils/createSession.js";

export const findUserByEmail = (email) => UsersCollection.findOne({ email });

export const createUser = async (userData) => {
  const { password } = userData;

  const hashedPassword = await bcrypt.hash(password, 10);

  return UsersCollection.create({
    ...userData,
    password: hashedPassword,
  });
};

export const createActiveSession = async (userId) => {
  await SessionsCollection.deleteOne({ userId });

  return SessionsCollection.create({
    userId,
    ...createSession(),
  });
};

export const findSessionByToken = (token) =>
  SessionsCollection.findOne({ accessToken: token });

export const findUserById = (userId) => UsersCollection.findById(userId);

export const logoutUser = (sessionId, refreshToken) =>
  SessionsCollection.deleteOne({ _id: sessionId, refreshToken });
