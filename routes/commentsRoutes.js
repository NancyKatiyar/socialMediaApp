const express = require("express");
const { createComment, deleteComment, updateComment, getAllComments, createReply, getAllReplies } = require("../controller/commentController");
const authMiddleware = require("../middleware/authMiddleware");
const { commentSchema } = require("../validation/comments.validation");
const joiValidate = require("../middleware/joi.validate.middleware");
const commentRouter = express.Router();


commentRouter.post("/createComment/:post_id",authMiddleware,joiValidate(commentSchema),createComment);
commentRouter.delete("/deleteComment/:id",authMiddleware,deleteComment);
commentRouter.put("/updateComment/:post_id",authMiddleware,joiValidate(commentSchema),updateComment);
commentRouter.get("/getAllComments",getAllComments);
commentRouter.post("/createReply/:post_id/comments/:parent_id",authMiddleware,createReply);
commentRouter.get("/getAllReplies/:post_id/",getAllReplies);


module.exports = commentRouter;