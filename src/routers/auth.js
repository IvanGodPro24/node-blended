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
import { checkToken } from "../middlewares/checkToken.js";

const router = Router();

router.post(
  "/signup",
  validateBody(registerUserSchema),
  ctrlWrapper(registerUserController)
);

router.post(
  "/login",
  validateBody(loginUserSchema),
  ctrlWrapper(loginUserController)
);

router.post("/logout", checkToken, ctrlWrapper(logoutUserController));

router.get("/current", checkToken, ctrlWrapper(refreshUserSessionController));

export default router;
