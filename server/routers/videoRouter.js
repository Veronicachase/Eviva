const express = require ("express");
const { addVideo, getVideoById, getAllVideos,updateVideo, deleteVideo } = require ("../controllers/videoController");
const videoRouter =express.Router();
//const authenticateToken = require("../middleWares/authenticateToken");
const upload = require("../middleWares/multer");
const requireAdmin = require ("../middleWares/requireAdmin")
const requireSubscription =require("../middleWares/requireSubscription")

//videoRouter.use(authenticateToken);


// Rutas que requieren autenticación y chequeo de suscripción

videoRouter.get('/', getAllVideos);
videoRouter.get('/:videoId', getVideoById);


// videoRouter.get('/', authenticateToken, requireSubscription, getAllVideos);
// videoRouter.get('/:videoId', authenticateToken, requireSubscription, getVideoById);

// Rutas que requieren autenticación y privilegios de administrador


videoRouter.post('/',upload.single('image'), requireAdmin, addVideo);
videoRouter.patch('/:videoId', requireAdmin, updateVideo);
videoRouter.delete('/:videoId', requireAdmin, deleteVideo);

// videoRouter.post('/', authenticateToken, requireAdmin, addVideo);
// videoRouter.patch('/:videoId', authenticateToken, requireAdmin, updateVideo);
// videoRouter.delete('/:videoId', authenticateToken, requireAdmin, deleteVideo);


module.exports = videoRouter;