import Express from "express";
import * as CommentController from "../controllers/commentController";
const router = Express.Router();

router.post("/:blogId", CommentController.commentBlog);
router.delete("/:blogId", CommentController.deleteComment);
router.patch("/:blogId", CommentController.editComment);

// router.get("/viewAll", BlogController.viewAllBlogs);

export default router;
