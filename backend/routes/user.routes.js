import { Router } from "express";
import {
  changeUserRole,
  getAlluser,
  login,
  signin,
} from "../controller/user.controller.js";
import roleMiddleware from "../middleware/roleMIddleware.js";

const userRouter = Router();

userRouter.post("/signin", signin);
userRouter.post("/login", login);

userRouter.get("/all", getAlluser);

userRouter.post("/edit/role/:userId", roleMiddleware("admin"), changeUserRole);

export default userRouter;
