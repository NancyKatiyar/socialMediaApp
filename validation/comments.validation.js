const Joi = require("joi");

const commentSchema = Joi.object({
   post_id:Joi.number().required().messages({
    "any.required":"Post is required for comments",
    "any.empty":"for comments post can not be empty"
   }),
   comment_description:Joi.string().required().messages({
    "any.required":"Comment description is  required for comments",
    "any.empty":"comments description can not be empty"
   })
})

module.exports ={commentSchema}