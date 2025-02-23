import { DB_PATH } from "../constants/index.js";
import fs from "node:fs/promises";

export const getProductsByCategories = async () => {
  try {
    const productData = await fs.readFile(DB_PATH, "utf-8");
    const products = JSON.parse(productData);

    const categories = products
      .map((item) => item.category)
      .filter((category, i, arr) => arr.indexOf(category) === i);

    const objectByCategories = products.reduce((acc, { name, category }) => {
      if (categories.includes(category)) {
        if (!acc[category]) {
          acc[category] = [];
        }

        acc[category].push(name);
      }

      return acc;
    }, {});

    console.log(objectByCategories);
  } catch (error) {
    console.error(error);
  }
};

getProductsByCategories();
