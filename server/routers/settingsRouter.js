const express = require ("express");
const {getAllSettings, updateSettings } = require ("../controllers/settingsController");
const settingsRouter =express.Router();
const authenticateToken = require("../middleWares/authenticateToken");
const requireSubscription =require("../middleWares/requireSubcription");

settingsRouter.use(authenticateToken);



settingsRouter.get("/",  requireSubscription,getAllSettings );
settingsRouter.patch("/:settingsId", requireSubscription, updateSettings);




module.exports = settingsRouter;