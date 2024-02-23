import { Router } from "express";
import * as UserController from "../controllers/UserControllers";
import checkAuth from "../middleware/check-auth";

const router = Router();

router.post("/signup", UserController.signup);

router.post("/login", UserController.login);

router.delete("/:id",checkAuth, UserController.Delete);

export default router;
