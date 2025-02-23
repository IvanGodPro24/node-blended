import { DB_PATH } from "../constants/index.js";
import fs from "node:fs/promises";
import { createFakeProduct } from "../utils/createFakeProduct.js";

export const generateProducts = async (number) => {
  try {
    const productsData = await fs.readFile(DB_PATH, "utf-8");

    const products = JSON.parse(productsData);

    for (let i = 0; i < number; i += 1) {
      const product = createFakeProduct();

      products.push(product);

      await fs.writeFile(DB_PATH, JSON.stringify(products, undefined, 2));
    }
  } catch (error) {
    console.error(error);
  }
};

generateProducts(20);
