import { Router } from "express";
import bookRouter from "./book.routes";
import userRouter from "./user.routes";

const router = Router();

router.use("" , bookRouter )
router.use("/user" , userRouter )


export default router;