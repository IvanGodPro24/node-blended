import { DB_PATH } from "../constants/index.js";
import fs from "node:fs/promises";

export const getProductsCategories = async () => {
  try {
    const productData = await fs.readFile(DB_PATH, "utf-8");
    const products = JSON.parse(productData);

    const categories = products
      .map((item) => item.category)
      .filter((category, i, arr) => arr.indexOf(category) === i);

    console.log(categories);
  } catch (error) {
    console.log(error);
  }
};

getProductsCategories();
