const express = require("express");
const { registerUser, userLogin } = require("../controller/userController");
const { userSchema,loginSchema } = require("../validation/user.validation");
const joiValidate = require("../middleware/joi.validate.middleware");
const userRoutes = express.Router();

userRoutes.post("/register",joiValidate(userSchema),registerUser);
userRoutes.post("/login",joiValidate(loginSchema),userLogin);

module.exports = userRoutes