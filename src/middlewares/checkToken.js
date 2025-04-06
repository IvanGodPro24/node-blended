import createHttpError from "http-errors";
import { findUserById } from "../services/auth.js";
import jwt from "jsonwebtoken";
import { env } from "../utils/env.js";

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

  const { id } = jwt.verify(token, env("JWT_SECRET"));

  const user = await findUserById(id);

  if (!user) {
    next(createHttpError(401, "User not found"));
    return;
  }

  req.user = user;

  next();
};
