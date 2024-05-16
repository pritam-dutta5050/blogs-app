import Express from "express";
import * as BlogController from "../controllers/blogController";

const router = Express.Router();

router.get("/", BlogController.getBlogs);
router.post("/", BlogController.createBlog);
router.patch("/:blogId", BlogController.updateBlog);
router.delete("/:blogId", BlogController.deleteBlog);
router.post("/like/:blogId", BlogController.likeBlog);

// router.get("/viewAll", BlogController.viewAllBlogs);

export default router;
