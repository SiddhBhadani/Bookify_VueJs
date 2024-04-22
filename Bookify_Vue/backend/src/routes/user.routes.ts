import { Router } from "express";
import userController from "../controllers/user.controller";
import middlwares from "../middlwares";


const router = Router();

router.post("/register" , userController.signUp);
router.post("/login" , userController.login);
router.get("/profile" , middlwares.authenticate , userController.getProfile)
router.delete("/delete",middlwares.authenticate,userController.deleteProfile)

export default router;