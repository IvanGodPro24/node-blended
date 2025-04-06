import createHttpError from "http-errors";
import bcrypt from "bcrypt";
import {
  //   createActiveSession,
  findUserByEmail,
  createUser,
  updateUserWithToken,
  logoutUser,
  //   findSessionById,
} from "../services/auth.js";
// import { setupCookies } from "../utils/setupCookies.js";

export const registerUserController = async (req, res) => {
  const user = await findUserByEmail(req.body.email);

  if (user) throw createHttpError(409, "Email in use");

  const newUser = await createUser(req.body);

  res.status(201).json({
    user: {
      name: newUser.name,
      email: newUser.email,
    },
    token: newUser.token,
  });
};

export const loginUserController = async (req, res) => {
  const user = await findUserByEmail(req.body.email);

  if (!user) throw createHttpError(401, "Credentials wrong!");

  const isEqualPassword = await bcrypt.compare(
    req.body.password,
    user.password
  );

  if (!isEqualPassword) throw createHttpError(401, "Credentials wrong!");

  const newUser = await updateUserWithToken(user._id);

  res.json({
    user: {
      name: newUser.name,
      email: newUser.email,
    },
    token: newUser.token,
  });
};

export const logoutUserController = async (req, res) => {
  await logoutUser(req.user._id);

  res.status(204).send();
};

export const refreshUserSessionController = async (req, res) => {
  const { name, email } = req.user;

  res.json({
    name,
    email,
  });
};
