import fs from "node:fs/promises";
import { DB_PATH } from "../constants/index.js";

export const filterByMinPrice = async (minPrice) => {
  const productsData = await fs.readFile(DB_PATH, "utf-8");
  const parseProducts = JSON.parse(productsData);

  const filterProducts = parseProducts.filter(
    (product) => product.price >= minPrice
  );
  console.table(filterProducts);
};

filterByMinPrice(500);
