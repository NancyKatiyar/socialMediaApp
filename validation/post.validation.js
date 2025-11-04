const Joi = require("joi");



const postSchema = Joi.object({
    post_title:Joi.string().required().messages({
        "any.required":"For post Title is impoartant",
        "any.empty":"post title can not be empty"
    }),
    visibility:Joi.string().required().messages({
        "any.required":"For post visibility is impoartant",
        "any.empty":"post visibilty can not be empty"
    }),
    image: Joi.any().optional(), 
})


module.exports = {postSchema}