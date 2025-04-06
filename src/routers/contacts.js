import { Router } from "express";
import {
  createContactsController,
  deleteContactController,
  getAllContactsController,
  updateContactController,
} from "../controllers/contacts.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { checkToken } from "../middlewares/checkToken.js";
import { validateBody } from "../utils/validateBody.js";
import {
  createContactSchema,
  updateContactSchema,
} from "../validation/contact.js";

const router = Router();

router.get("/", checkToken, ctrlWrapper(getAllContactsController));

router.post(
  "/",
  checkToken,
  validateBody(createContactSchema),
  ctrlWrapper(createContactsController)
);

router.delete("/:contactId", checkToken, ctrlWrapper(deleteContactController));

router.patch(
  "/:contactId",
  checkToken,
  validateBody(updateContactSchema),
  ctrlWrapper(updateContactController)
);

export default router;
