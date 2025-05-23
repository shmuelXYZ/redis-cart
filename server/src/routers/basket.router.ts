import express from "express";
import { basketController } from "../controllers/basket.controller";

// GET /api/basket - Get basket items (ID + quantity only)
// POST /api/basket - Add item to basket (send only product ID)
// PUT /api/basket/:id - Update quantity
// DELETE /api/basket/:id - Remove item

const router = express.Router();
router.get("/api/basket/all-products", basketController.getAllProducts);
router.get("/api/basket", basketController.getAll);
router.delete("/api/basket/:id", basketController.deleteItem);
router.put("/api/basket/:id", basketController.editItem);
router.post("/api/basket", basketController.addItem);

export = router;
