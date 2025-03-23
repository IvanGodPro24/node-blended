import createHttpError from "http-errors";
import { findSessionByToken, findUserById } from "../services/auth.js";

export const checkToken = async (req, res, next) => {
  const authHeader = req.get("Authorization");

  if (!authHeader) {
    next(createHttpError(401, "Please provide auth header"));
    return;
  }

  const [bearer, token] = authHeader.split(" ");

  if (bearer !== "Bearer" || !token) {
    next(createHttpError(401, "Wrong header or token"));
    return;
  }

  const session = await findSessionByToken(token);

  if (!session) {
    next(createHttpError(401, "Session not found"));
    return;
  }

  const isExpiredAccessToken = Date.now() > session.accessTokenValidUntil;

  if (isExpiredAccessToken) {
    next(createHttpError(401, "Acces token expired"));
    return;
  }

  const user = await findUserById(session.userId);

  if (!user) {
    next(createHttpError(401, "User not found"));
    return;
  }

  req.user = user;

  next();
};
