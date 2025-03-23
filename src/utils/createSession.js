import { randomBytes } from "crypto";
import { FIFTEEN_MINUTES, THIRTY_DAYS } from "../constants/index.js";

export const createSession = () => ({
  accessToken: randomBytes(30).toString("base64"),
  refreshToken: randomBytes(30).toString("base64"),
  accessTokenValidUntil: Date.now() + FIFTEEN_MINUTES,
  refreshTokenValidUntil: Date.now() + THIRTY_DAYS,
});
