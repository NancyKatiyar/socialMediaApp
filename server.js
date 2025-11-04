const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");


dotenv.config();

app.use(cors({
  origin: "http://127.0.0.1:5500",
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());


app.use(express.static(path.join(__dirname, "views/instagram-clone")));
app.use(express.static("uploads"));

app.get("/", (req, res) => {
  res.redirect("/pages/login.html");
});

// Routes
const userRoutes = require("./routes/userRoutes");
const postRouter = require("./routes/postRoutes");
const commentRouter = require("./routes/commentsRoutes");

app.use("/", userRoutes);
app.use("/", postRouter);
app.use("/", commentRouter);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});
