import express from "express";
import {getNetworks, getQuote, createSwap, getSwap, deleteSwap} from "../controllers/controller.js";

const router = express.Router();

router.get("/networks", getNetworks);
router.post("/quote", getQuote);
router.post("/swaps",  createSwap);
router.get("/swaps/:id", getSwap);
router.delete("/swaps/:id", deleteSwap);


export default router;
