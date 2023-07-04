import express from "express";
import isAuth from "../middleware/is-auth.js";
import AboutController from "../controllers/about.js";

const aboutRouter = express.Router();

aboutRouter.get("/about", AboutController.getAbout);
aboutRouter.get("/about/:id", AboutController.getAboutById);
aboutRouter.post("/about", isAuth, AboutController.postAbout);
aboutRouter.put("/about/:id", isAuth, AboutController.putAbout);
aboutRouter.delete("/about/:id", isAuth, AboutController.deleteAbout);


export default aboutRouter;
