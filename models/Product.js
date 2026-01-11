import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    productId: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    name: {
      type: String,
      required: true,
      trim: true
    },
    price: {
      type: Number,
      required: true,
      min: [0, "Price cannot be negative"]
    },
    featured: {
      type: Boolean,
      default: false
    },
    rating: {
      type: Number,
      min: 0,
      max: 5
    },
    company: {
      type: String,
      required: true,
      trim: true
    },
    createdAt: {
      type: Date,
      required: true,
      default: Date.now
    }
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
