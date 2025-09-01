
import { Router } from "express";
import { authMiddleware } from "../middleware";
import {
    addContentHandler,
    deleteContentHandler,
    getAllContentHandler,
    getContentHandler,
    updateContentHandler,
    getUserDetails
} from "../controller/user.controller";

const userRoutes = Router();

userRoutes.use(authMiddleware);

userRoutes.get("/me", getUserDetails);
userRoutes.get("/content", getAllContentHandler);
userRoutes.post("/content", addContentHandler);
userRoutes.delete("/content/:contentId", deleteContentHandler);
userRoutes.patch("/content/:contentId", updateContentHandler);
userRoutes.get("/content/:contentId", getContentHandler);

export default userRoutes;