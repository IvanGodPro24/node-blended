import createHttpError from "http-errors";
import bcrypt from "bcrypt";
import {
  createActiveSession,
  findUserByEmail,
  createUser,
  logoutUser,
  findSessionById,
} from "../services/auth.js";
import { setupCookies } from "../utils/setupCookies.js";

export const registerUserController = async (req, res) => {
  const user = await findUserByEmail(req.body.email);

  if (user) throw createHttpError(409, "Email in use");

  const newUser = await createUser(req.body);

  res.status(201).json({
    status: 201,
    message: "Successfully registered a user!",
    data: {
      name: newUser.name,
      email: newUser.email,
    },
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

  const session = await createActiveSession(user._id);

  setupCookies(res, session);

  res.json({
    status: 200,
    message: "Successfully logged in an user!",
    data: {
      accessToken: session.accessToken,
    },
  });
};

export const logoutUserController = async (req, res) => {
  const { sessionId, refreshToken } = req.cookies;

  await logoutUser(sessionId, refreshToken);

  res.clearCookie("sessionId");
  res.clearCookie("refreshToken");

  res.status(204).send();
};

export const refreshUserSessionController = async (req, res) => {
  const { sessionId, refreshToken } = req.cookies;

  const session = await findSessionById(sessionId, refreshToken);

  if (!session) throw createHttpError(401, "Session not found");

  const isExpiredRefreshToken = Date.now() > session.refreshTokenValidUntil;

  if (isExpiredRefreshToken)
    throw createHttpError(401, "Refresh token expired");

  const newSession = await createActiveSession(session.userId);

  setupCookies(res, newSession);

  res.json({
    status: 200,
    message: "Successfully refreshed a session!",
    data: {
      accessToken: newSession.accessToken,
    },
  });
};
