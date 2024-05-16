import Express from "express";
import * as UserController from "../controllers/userController";
import { requireAuth } from "../middleware/auth";

const router = Express.Router();

router.post("/adduseronetimeonly", UserController.addUserOneTimeOnly);

router.get("/", requireAuth, UserController.getAuthenticatedUser);
router.get("/:userId", requireAuth, UserController.getUserById)
router.post("/signup", UserController.signup);
router.post("/login", UserController.login);
router.post("/logout", UserController.logout);

export default router;