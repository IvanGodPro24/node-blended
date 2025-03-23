import { Router } from "express";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import {
  createProductController,
  deleteProductController,
  getProductByIdController,
  getProductsController,
  upsertProductController,
  updateProductController,
} from "../controllers/products.js";
// import { validateBody } from "../utils/validateBody.js";

const router = Router();

router.get("/", ctrlWrapper(getProductsController));

router.get("/:productId", ctrlWrapper(getProductByIdController));

router.post("/", ctrlWrapper(createProductController));

router.delete("/:productId", ctrlWrapper(deleteProductController));

router.put("/:productId", ctrlWrapper(upsertProductController));

router.patch("/:productId", ctrlWrapper(updateProductController));

export default router;
