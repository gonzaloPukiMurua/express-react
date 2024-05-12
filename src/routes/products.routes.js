import express from "express";
import {
    addProduct,
    getProduct,
    allProducts,
    updateProduct,
    deleteProduct
 } from "../controllers/product.controllers.js";

import { authorization } from "../middlewares/auth.middleware.js";
const router = express.Router();

router.get("/product/", authorization, allProducts);
router.get("/product/:id", authorization, getProduct);
router.post("/product/", authorization, addProduct);
router.put("/product/:id", authorization, updateProduct);
router.delete("/product/:id", authorization, deleteProduct);

export default router;