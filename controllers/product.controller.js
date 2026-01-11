import Product from "../models/Product.js";

export const addProduct = async (req, res, next) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    next(error);
  }
};

export const getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    next(error);
  }
};

export const updateProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!product)
      return res.status(404).json({ message: "Product not found" });

    res.json(product);
  } catch (error) {
    next(error);
  }
};

export const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product)
      return res.status(404).json({ message: "Product not found" });

    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    next(error);
  }
};

export const getFeaturedProducts = async (req, res, next) => {
  try {
    const products = await Product.find({ featured: true });
    res.json(products);
  } catch (error) {
    next(error);
  }
};

export const getProductsBelowPrice = async (req, res, next) => {
  try {
    const products = await Product.find({
      price: { $lt: Number(req.params.price) }
    });
    res.json(products);
  } catch (error) {
    next(error);
  }
};

export const getProductsAboveRating = async (req, res, next) => {
  try {
    const products = await Product.find({
      rating: { $gt: Number(req.params.rating) }
    });
    res.json(products);
  } catch (error) {
    next(error);
  }
};
