const recipeDao = require("../DatabaseAndDao/recipeDao");


const addRecipe = async (req, res) => {
    if (!req.user || req.user.role !== 'admin') {
        return res.status(403).send('Acceso denegado. Se requieren privilegios de administrador.');
    }
    try {
        const userId = req.user.userId;
        let recipeUrl =null;
        if(req.file){
            recipeUrl = `/uploads/${req.file.filename}`
        }
        const recipeData = {...req.body,userId, image:recipeUrl }
        
        const recipeId = await recipeDao.addRecipe({recipeData});
        res.status(201).json({ message: "recipe creado exitosamente", recipeId });
    } catch (error) {
        console.error("Error al agregar el recipe:", error.message);
        res.status(500).json({ error: error.message });
    }
};

const getRecipeById = async (req, res) => {
    try {
        
        const recipeId = req.params.recipeId;
        const userId = req.user.userId; 
        const recipe = await recipeDao.getRecipeById(recipeId, userId);
        if (recipe) {
            res.json(recipe);
        } else {
            res.status(404).json({ message: "recipe no encontrado" });
        }
    } catch (error) {
        console.error("Error al obtener el recipe:", error.message);
        res.status(500).json({ error: error.message });
    }
};

const getAllRecipes = async (req, res) => {
    try {
        const userId = req.user.userId; 
        const recipes = await recipeDao.getAllrecipes(userId);
        if (recipes) {
            res.json(recipes);
        } else {
            res.status(404).json({ message: "No hay recipes creados" });
        }
    } catch (error) {
        console.error("Error al obtener tus recipes:", error.message);
        res.status(500).json({ error: error.message });
    }
};

const updateRecipe = async (req, res) => {
    if (!req.user || req.user.role !== 'admin') {
        return res.status(403).send('Acceso denegado. Se requieren privilegios de administrador.');
    }
    try {
        const recipeId = req.params.recipeId;
        const userId = req.user.userId;
        const updatedRecipeData = req.body;
        await recipeDao.updateRecipe(userId, recipeId, updatedRecipeData);
        res.json({ message: "recipe actualizado exitosamente" });
    } catch (error) {
        console.error("Error al actualizar el recipe:", error.message);
        res.status(500).json({ error: error.message });
    }
};

const deleteRecipe = async (req, res) => {
    if (!req.user || req.user.role !== 'admin') {
        return res.status(403).send('Acceso denegado. Se requieren privilegios de administrador.');
    }
    try {
        const recipeId = req.params.recipeId;
        const userId = req.user.userId;
        await recipeDao.deleteRecipe(userId, recipeId);
        res.json({ message: "recipe eliminado exitosamente" });
    } catch (error) {
        console.error("Error al eliminar el recipe:", error.message);
        res.status(500).json({ error: error.message });
    }
};



module.exports = { addRecipe, getRecipeById, getAllRecipes, updateRecipe, deleteRecipe };
