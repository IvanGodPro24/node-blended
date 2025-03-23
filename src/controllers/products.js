import createHttpError from "http-errors";
import {
  getProducts,
  getProductById,
  createProduct,
  deleteProduct,
  updateProduct,
} from "../services/products.js";

export const getProductsController = async (req, res) => {
  const products = await getProducts(req.user._id);

  res.json({
    status: 200,
    message: "Successfully found products!",
    data: products,
  });
};

export const getProductByIdController = async (req, res) => {
  const { productId } = req.params;

  const product = await getProductById(productId, req.user._id);

  if (!product) throw createHttpError(404, "Product not found!");

  res.json({
    status: 200,
    message: `Successfully found product with id ${productId}!`,
    data: product,
  });
};

export const createProductController = async (req, res) => {
  const product = await createProduct(req.body, req.user._id);

  res.status(201).json({
    status: 201,
    message: "Successfully created a product!",
    data: product,
  });
};

export const deleteProductController = async (req, res) => {
  const { productId } = req.params;

  const product = await deleteProduct(productId, req.user._id);

  if (!product) throw createHttpError(404, "Product not found!");

  //   res.status(204).end();

  res.sendStatus(204);
};

export const upsertProductController = async (req, res) => {
  const { productId } = req.params;

  const result = await updateProduct(productId, req.user._id, req.body, {
    upsert: true,
  });

  if (!result) throw createHttpError(404, "Product not found!");

  const status = result.isNew ? 201 : 200;

  res.status(status).json({
    status,
    message: `Successfully upserted a product with id ${productId}!`,
    data: result.product,
  });
};

export const updateProductController = async (req, res) => {
  const { productId } = req.params;

  const result = await updateProduct(productId, req.user._id, req.body);

  if (!result) throw createHttpError(404, "Product not found!");

  res.json({
    status: 200,
    message: `Successfully patched a product with id ${productId}!`,
    data: result.product,
  });
};
