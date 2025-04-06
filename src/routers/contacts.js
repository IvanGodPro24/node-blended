import { Router } from "express";
import {
  createContactsController,
  getAllContactsController,
} from "../controllers/contacts.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { checkToken } from "../middlewares/checkToken.js";
import { validateBody } from "../utils/validateBody.js";
import { createContactSchema } from "../validation/contact.js";

const router = Router();

router.get("/", checkToken, ctrlWrapper(getAllContactsController));

router.post(
  "/",
  checkToken,
  validateBody(createContactSchema),
  ctrlWrapper(createContactsController)
);

export default router;
