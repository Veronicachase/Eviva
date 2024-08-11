const express = require("express");
const {addBlog, getBlogById, getAllBlogs, updateBlog, deleteBlog } = require ("../controllers/blogController");
const blogRouter = express.Router();
const authenticateToken = require ("../middleWares/authenticateToken")
const requireAdmin = require("../middleWares/requireAdmin");
const requireSubscription =require("../middleWares/requireSubscription");

blogRouter.use(authenticateToken);


blogRouter.get("/:blogId",requireSubscription, getBlogById);
blogRouter.get("/", requireSubscription,getAllBlogs );

// Requiere Admin
blogRouter.post("/", requireAdmin, addBlog);
blogRouter.patch("/:blogId", requireAdmin,updateBlog);
blogRouter.delete("/:blogId", requireAdmin, deleteBlog);

module.exports = blogRouter

