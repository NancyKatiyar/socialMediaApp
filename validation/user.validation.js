const Joi = require("joi")


const userSchema = Joi.object({
    user_name:Joi.string().required().messages({
        "any.required":"Name is required",
        "string.empty":"String can not be empty"
    }),
    email:Joi.string().email().required().messages({
        "any.required":"Email is required",
        "string.empty":"Email can not be empty"
    }),

    password:Joi.string().required().messages({
        "any.required":"Password is required",
        "string.empty":"Password can not be empty"
    })
});


const loginSchema = Joi.object({
    email:Joi.string().required().messages({
        "any.required":"Crediantials will be required",
        "any.string":"Credentials can not be null"
    }),

    password:Joi.string().required().messages({
        "any.required":"Crediantials will be required",
        "any.string":"Credentials can not be null"
    })
});



module.exports = {userSchema,loginSchema}