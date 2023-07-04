import express from "express";
import {getNetworks, getQuote} from "../controllers/controller.js";

const router = express.Router();

router.get("/networks", getNetworks);
router.post("/quote", getQuote);
router.post("/swaps",  postAbout);
// router.get("/swaps/:id", controller.putAbout);
// router.delete("swaps/:id", controller.deleteAbout);


export default router;
