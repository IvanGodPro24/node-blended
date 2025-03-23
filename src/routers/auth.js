import { Router } from "express";
import { validateBody } from "../utils/validateBody.js";
import { loginUserSchema, registerUserSchema } from "../validation/user.js";
import {
  loginUserController,
  logoutUserController,
  refreshUserSessionController,
  registerUserController,
} from "../controllers/auth.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";

const router = Router();

router.post(
  "/register",
  validateBody(registerUserSchema),
  ctrlWrapper(registerUserController)
);

router.post(
  "/login",
  validateBody(loginUserSchema),
  ctrlWrapper(loginUserController)
);

router.post("/logout", ctrlWrapper(logoutUserController));

router.post("/refresh", ctrlWrapper(refreshUserSessionController));

export default router;
