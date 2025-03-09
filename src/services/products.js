import { ProductModel } from "../db/models/Product.js";

export const getProducts = () => ProductModel.find();

// export const getProductById = (productId) =>
//   ProductModel.findOne({ id: productId });

export const getProductById = (productId) => ProductModel.findById(productId);

export const createProduct = (productData) => ProductModel.create(productData);

// export const deleteProduct = (productId) =>
//   ProductModel.findOneAndDelete({ id: productId });

export const deleteProduct = (productId) =>
  ProductModel.findByIdAndDelete(productId);

// export const updateProduct = (productId, productData) =>
//   ProductModel.findOneAndUpdate({ id: productId }, productData, { new: true });

export const updateProduct = (productId, productData, options = {}) => {
  const result = ProductModel.findByIdAndUpdate(productId, productData, {
    new: true,
    includeResultMetadata: true,
    ...options,
  });

  if (!result || !result.value) {
    return null;
  }

  return {
    product: result.value,
    isNew: Boolean(result?.lastErrorObject?.upserted),
  };
};
