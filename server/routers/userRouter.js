const express = require("express");
const authenticateToken =require("../middleWares/authenticateToken")
const {
  addUser,
  loginUser,
  deleteUser,
  updateUser,
  getUser,
  logoutUser
} = require("../controllers/userController");

const userRouter = express.Router();

userRouter.post("/", addUser);
userRouter.post("/login", loginUser);
userRouter.post("/logout",authenticateToken,logoutUser);
userRouter.get("/:userId",authenticateToken, getUser);
userRouter.delete("/:userId",authenticateToken, deleteUser);
userRouter.patch("/:userId",authenticateToken, updateUser);


module.exports = userRouter;