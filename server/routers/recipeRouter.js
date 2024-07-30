const express = require ("express");
const { addRecipe, getRecipeById, getAllRecipes,updateRecipe, deleteRecipe } = require ("../controllers/recipeController");
const recipeRouter =express.Router();
const authenticateToken = require("../middleWares/authenticateToken");
const requireAdmin = require("../middleWares/requireAdmin");
const requireSubscription =require("../middleWares/requireSubcription");

recipeRouter.use(authenticateToken);


recipeRouter.get("/:recipeId", requireSubscription, getRecipeById);
recipeRouter.get("/",  requireSubscription, getAllRecipes);

// Routes requiring admin permits
recipeRouter.post("/", requireAdmin, addRecipe);
recipeRouter.patch("/:recipeId", requireAdmin, updateRecipe);
recipeRouter.delete("/:recipeId", requireAdmin, deleteRecipe);


module.exports = recipeRouter;



