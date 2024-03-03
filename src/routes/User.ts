import { Router } from "express";
import * as UserController from "../controllers/UserControllers";
import checkAuth from "../middleware/check-auth";

const router = Router();

router.post("/signup", UserController.signup);

router.post("/login",checkAuth, UserController.login);

router.get("/getAllUser", UserController.getAllUsers);

router.get("/getUserById/:id", UserController.getUserById);

router.put("/updateUser/:id",checkAuth, UserController.updateUser);

router.delete("/deleteUser/:id",checkAuth, UserController.deleteUser);

export default router;
