import express from "express";
import {
    addProduct,
    deleteProduct,
    getAllProducts,
    getFeaturedProducts,
    getProductsAboveRating,
    getProductsBelowPrice,
    updateProduct
} from "../controllers/product.controller.js";
import auth from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", auth, addProduct);
router.get("/", getAllProducts);
router.put("/:id", auth, updateProduct);
router.delete("/:id", auth, deleteProduct);

router.get("/featured", getFeaturedProducts);
router.get("/price/:price", getProductsBelowPrice);
router.get("/rating/:rating", getProductsAboveRating);

export default router;
