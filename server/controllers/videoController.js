const videoDao = require("../DatabaseAndDao/videoDao");


const addVideo = async (req, res) => {
    if (!req.user || req.user.role !== 'admin') {
        return res.status(403).send('Acceso denegado. Se requieren privilegios de administrador.');
    }
    try {
        const userId = req.user.userId;
        const videoId = await videoDao.addVideo({...req.body, userId});
        res.status(201).json({ message: "Video creado exitosamente", videoId });
    } catch (error) {
        console.error("Error al agregar el video:", error.message);
        res.status(500).json({ error: error.message });
    }
};

const getVideoById = async (req, res) => {
    try {
        
        const videoId = req.params.videoId;
        const userId = req.user.userId; 
        const video = await videoDao.getVideoById(videoId, userId);
        if (video) {
            res.json(video);
        } else {
            res.status(404).json({ message: "video no encontrado" });
        }
    } catch (error) {
        console.error("Error al obtener el video:", error.message);
        res.status(500).json({ error: error.message });
    }
};

const getAllVideos = async (req, res) => {
    try {
        const userId = req.user.userId; 
        const videos = await videoDao.getAllVideos(userId);
        if (videos) {
            res.json(videos);
        } else {
            res.status(404).json({ message: "No hay videos creados" });
        }
    } catch (error) {
        console.error("Error al obtener tus videos:", error.message);
        res.status(500).json({ error: error.message });
    }
};

const updateVideo = async (req, res) => {
    if (!req.user || req.user.role !== 'admin') {
        return res.status(403).send('Acceso denegado. Se requieren privilegios de administrador.');
    }
    try {
        const videoId = req.params.videoId;
        const userId = req.user.userId;
        const updatedvideoData = req.body;
        await videoDao.updateVideo(userId, videoId, updatedvideoData);
        res.json({ message: "video actualizado exitosamente" });
    } catch (error) {
        console.error("Error al actualizar el video:", error.message);
        res.status(500).json({ error: error.message });
    }
};

const deleteVideo = async (req, res) => {
    if (!req.user || req.user.role !== 'admin') {
        return res.status(403).send('Acceso denegado. Se requieren privilegios de administrador.');
    }
    try {
        const videoId = req.params.videoId;
        const userId = req.user.userId;
        await videoDao.deleteVideo(userId, videoId);
        res.json({ message: "video eliminado exitosamente" });
    } catch (error) {
        console.error("Error al eliminar el video:", error.message);
        res.status(500).json({ error: error.message });
    }
};



module.exports = { addVideo, getVideoById, getAllVideos, updateVideo, deleteVideo };
