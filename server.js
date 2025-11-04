const express = require("express");
const app = express();
const path = require("path");
const dotenv = require("dotenv")
dotenv.config();
app.use(express.json());
const cookieParser = require("cookie-parser");
app.use(cookieParser());

app.use(express.static('uploads'));

app.use(express.static(path.join(__dirname, "views/instagram-clone")));
app.get("/", (req, res) => {
  res.redirect("/pages/login.html");
});


const userRoutes = require("./routes/userRoutes");
const postRouter = require("./routes/postRoutes")
const commentRouter = require("./routes/commentsRoutes")
app.use("/",userRoutes)
app.use("/",postRouter)
app.use("/",commentRouter)








app.listen(process.env.PORT,()=>{
    console.log(`Server is running on port ${process.env.PORT}`)
})
