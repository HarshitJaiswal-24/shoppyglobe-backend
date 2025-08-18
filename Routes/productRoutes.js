import express from "express";
import { getAllProducts, getProductById, createProduct } from "../Controller/productController.js";

const router = express.Router();

router.get("/", getAllProducts);         // GET all products
router.get("/:id", getProductById);      // GET product by ID
router.post("/", createProduct);         // POST add product

export default router;
