import { ProductModel } from "../db/models/Product.js";

export const getProducts = (userId) => ProductModel.find({ userId });

// export const getProductById = (productId) =>
//   ProductModel.findOne({ id: productId });

export const getProductById = (productId, userId) =>
  ProductModel.findOne({ _id: productId, userId });

export const createProduct = (productData, userId) =>
  ProductModel.create({ userId, ...productData });

// export const deleteProduct = (productId) =>
//   ProductModel.findOneAndDelete({ id: productId });

export const deleteProduct = (productId, userId) =>
  ProductModel.findOneAndDelete({ _id: productId, userId });

// export const updateProduct = (productId, productData) =>
//   ProductModel.findOneAndUpdate({ id: productId }, productData, { new: true });

export const updateProduct = async (productId, userId, productData, options = {}) => {
  const result = await ProductModel.findOneAndUpdate(
    { _id: productId, userId},
    productData,
    {
      new: true,
      includeResultMetadata: true,
      ...options,
    }
  );

  if (!result || !result.value) {
    return null;
  }

  return {
    product: result.value,
    isNew: Boolean(result?.lastErrorObject?.upserted),
  };
};
