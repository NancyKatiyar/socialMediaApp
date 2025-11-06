const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const { createPosts, deletePosts, updatePosts, getPosts } = require("../controller/postController");
const postRouter = express.Router();
const upload = require("../middleware/multermiddleware");
const { postSchema } = require("../validation/post.validation");
const joiValidate = require("../middleware/joi.validate.middleware");

postRouter.post(
  "/createPost",
  authMiddleware,
  upload.single("image"), 
  (req, res, next) => {
    console.log("After multer =>", req.body); 
    next();
  },
  joiValidate(postSchema),
  createPosts
);

postRouter.delete("/deletePosts/:id",authMiddleware,deletePosts)
postRouter.put("/updatePosts/:id",authMiddleware,upload.single("image"),joiValidate(postSchema),updatePosts)
postRouter.get("/getPosts",authMiddleware,getPosts)



module.exports = postRouter;