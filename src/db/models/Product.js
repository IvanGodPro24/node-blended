import { Schema, model } from "mongoose";

const product = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
      default: "other",
      enum: ["books", "electronics", "clothing", "other"],
    },
    description: {
      type: String,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const ProductModel = model("product", product);
