const {Posts,User} = require("../models");
const {Op} = require("sequelize")
const { errorResponseData, successResponseData } = require("../utils/response");

const createPosts = async(req,res)=>{
    try {
      console.log("api ca;ling")
        const user_id = req.user.id;
        const {post_title,visibility} = req.body;
        const image = req.file ? req.file.filename : null;
        const posts = await Posts.create({post_title,image,user_id,visibility});
        // return res.status(200).json({message:"Post created successfully",posts});
        return successResponseData(res,{posts},"Post created successfully");
    } catch (error) {
            console.error("Error during create Posts:",error);
         return errorResponseData(res,"Internal server error")
    }
}


const deletePosts = async(req,res)=>{
try {
    const user_id = req.user.id;
    const {id} = req.params;
    const deleteposts = await Posts.destroy({where:{id},user_id});
  return successResponseData(res,"Post created successfully",deleteposts);
} catch (error) {
       console.error("Error during create Posts:",error);
       return errorResponseData(res,"Internal server error")
}
}

const updatePosts = async(req,res) =>{
    try {
        const user_id = req.user.id;
        const {id} = req.params;
        const{post_title,visibility} = req.body;
             const image = req.file ? req.file.filename : null;
        const updatePosts = await Posts.update({ post_title, image, visibility,user_id }, { where: { id } })
        // return res.status(200).json({message:"Posts Updated Successfully",updatePosts})
          return successResponseData(res,"Posts Updated Successfully",updatePosts);
    } catch (error) {
          console.error("Error during create Posts:",error);
  return errorResponseData(res,"Internal server error")
    }
}



const getPosts = async (req, res) => {
  try {
    const user_id = req.user.id; 
    const posts = await Posts.findAll({
      where: {
        [Op.or]: [
          { visibility: "EveryOneCan view" },
          { 
            [Op.and]: [
              { visibility: "Only Me" },      
              { user_id: user_id }             
            ]
          }
        ]
      },
      include: [
        {
          model: User,
          attributes: ["user_name"]
        }
      ],
      order: [["createdAt", "DESC"]]
    });

    return res.status(200).json({
      success: true,
      message: "Posts fetched successfully",
      data: posts
    });
  } catch (error) {
    console.error("Error fetching posts:", error);
    return res.status(500).json({ message: "Server error" });
  }
};





module.exports = {createPosts,deletePosts,updatePosts,getPosts}