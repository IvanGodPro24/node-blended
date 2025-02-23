import { DB_PATH } from "../constants/index.js";
import fs from "node:fs/promises";

export const totalPrice = async () => {
  try {
    const productsData = await fs.readFile(DB_PATH, "utf-8");
    const products = JSON.parse(productsData);
    const totalPrice = products.reduce((total, { price }) => (total += Number(price)), 0);
    console.log(totalPrice.toFixed(2));
  } catch (error) {
    console.log(error);
  }
};

totalPrice();
