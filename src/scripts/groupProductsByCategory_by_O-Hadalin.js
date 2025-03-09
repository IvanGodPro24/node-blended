import { DB_PATH } from "../constants/index.js";
import fs from "node:fs/promises";

export const groupProductsByCategory = async () => {
  try {
    const productData = await fs.readFile(DB_PATH, "utf-8");
    const products = JSON.parse(productData);

    const groupedCategories = products.reduce((acc, { category, name }) => {
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(name);
      return acc;
    }, {});

    console.log(groupedCategories);
  } catch (error) {
    console.log(error);
  }
};

groupProductsByCategory();
