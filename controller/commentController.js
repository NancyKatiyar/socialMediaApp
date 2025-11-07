const { where } = require("sequelize");
const {Comment} = require("../models")
const {Posts} = require("../models");
const {User} = require("../models");
const { errorResponseData, successResponseData } = require("../utils/response");


const createComment = async(req,res) =>{
    try {
        const user_id = req.user.id;
        const {post_id} = req.params;
        const {comment_description} = req.body;
        const comments = await Comment.create({comment_description,user_id,post_id});
        // return res.status(200).json({message:"Comment Create Successfully",comments})
          return successResponseData(res,"Comment Create Successfully",comments);
    } catch (error) {
        console.error("Error during create Posts:",error);
  return errorResponseData(res,"Internal server error")
    }
}


const deleteComment = async(req,res)=>{
    try {
        const user_id = req.user.id;
        const{id} = req.params;
        const deleteComment = await Comment.destroy({where:{id},user_id})
        // return res.status(200).json({message:"Comment deleted successfully",deleteComment})
         return successResponseData(res,"Comment deleted successfully",deleteComment);
        
    } catch (error) {
         console.error("Error during create Posts:",error);
         return errorResponseData(res,"Internal server error")

    }
}


const updateComment = async(req,res) =>{
    try {
        const user_id = req.user.id;
        const {post_id} = req.params;
        const {comment_description} = req.body;
        const updateComment =  await Comment.update({comment_description,user_id},{where:{post_id}})
        // return res.status(200).json({message:"Comment updated successfully",updateComment})
         return successResponseData(res,"Comment updated successfully",updateComment);
    } catch (error) {
        console.error("Error during create Posts:",error);
    return errorResponseData(res,"Internal server error")
    }
}



const getAllComments = async (req, res) => {
  try {

    const comments = await Comment.findAll({

      attributes: ["id","comment_description"],
      include: [
        {
          model: User,
          attributes: ["user_name"], 
        },
        {
          model: Posts,
          attributes: ["id"],
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    // return res.status(200).json({
    //   message: "All comments fetched successfully",
    //   data: comments,
    // });
     return successResponseData(res,{comments},"All comments fetched successfully");
  } catch (error) {
    console.error("Error during fetching comments:", error);
   return errorResponseData(res,"Internal server error")
  }
};

const createReply = async (req, res) => {
  try {
    const { post_id, parent_id } = req.params;
    const { comment_description } = req.body;
    const user_id = req.user.id;

    const parentComment = await Comment.findByPk(parent_id);
    if (!parentComment) {
      return res.status(404).json({ message: 'Parent comment not found' });
    }

    const reply = await Comment.create({
      comment_description,
      post_id,
      user_id,
      parent_id
    });

    return res.status(201).json({ message: 'Reply added successfully', reply });
  } catch (error) {
    console.error('Error creating reply:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};


const getAllReplies = async (req, res) => {
  try {
    const post_id = req.params.post_id;

    let whereClause = { post_id, parent_id: null };

    const comments = await Comment.findAll({
      where: whereClause,
      include: [
        {
          model: Comment,
          as: "replies",
          include: [
            {
              model: Comment,
              as: "replies",
            },
          ],
        },
        {
          model: User,
          attributes: ["user_name"],
        },
      ],
    });

    return successResponseData(res,{ comments }, "Get All replies successfully");
  } catch (error) {
    console.error(error);
    return errorResponseData(res, "Internal server error");
  }
};







module.exports = {createComment,deleteComment,updateComment,getAllComments,createReply,getAllReplies}