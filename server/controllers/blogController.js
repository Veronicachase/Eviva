const blogDao = require("../DatabaseAndDao/blogDao");


const addBlog = async (req, res) => {
    if (!req.user || req.user.role !== 'admin') {
        return res.status(403).send('Acceso denegado. Se requieren privilegios de administrador.');
    }
    try {
        const userId = req.user.userId;
        const blogId = await blogDao.addBlog({...req.body, userId});
        res.status(201).json({ message: "blog creado exitosamente", blogId });
    } catch (error) {
        console.error("Error al agregar el blog:", error.message);
        res.status(500).json({ error: error.message });
    }
};

const getBlogById = async (req, res) => {
    try {
        
        const blogId = req.params.blogId;
        const userId = req.user.userId; 
        const blog = await blogDao.getBlogById(blogId, userId);
        if (blog) {
            res.json(blog);
        } else {
            res.status(404).json({ message: "blog no encontrado" });
        }
    } catch (error) {
        console.error("Error al obtener el blog:", error.message);
        res.status(500).json({ error: error.message });
    }
};

const getAllBlogs = async (req, res) => {
    try {
        const userId = req.user.userId; 
        const blogs = await blogDao.getAllBlogs(userId);
        if (blogs) {
            res.json(blogs);
        } else {
            res.status(404).json({ message: "No hay blogs creados" });
        }
    } catch (error) {
        console.error("Error al obtener tus blogs:", error.message);
        res.status(500).json({ error: error.message });
    }
};

const updateBlog = async (req, res) => {
    if (!req.user || req.user.role !== 'admin') {
        return res.status(403).send('Acceso denegado. Se requieren privilegios de administrador.');
    }
    try {
        const blogId = req.params.blogId;
        const userId = req.user.userId;
        const updatedData = req.body;
        await blogDao.updateBlog(userId, blogId, updatedData);
        res.json({ message: "blog actualizado exitosamente" });
    } catch (error) {
        console.error("Error al actualizar el blog:", error.message);
        res.status(500).json({ error: error.message });
    }
};

const deleteBlog = async (req, res) => {
    if (!req.user || req.user.role !== 'admin') {
        return res.status(403).send('Acceso denegado. Se requieren privilegios de administrador.');
    }
    try {
        const blogId = req.params.blogId;
        const userId = req.user.userId;
        await blogDao.deleteBlog(userId, blogId);
        res.json({ message: "blog eliminado exitosamente" });
    } catch (error) {
        console.error("Error al eliminar el blog:", error.message);
        res.status(500).json({ error: error.message });
    }
};



module.exports = { addBlog ,getBlogById, getAllBlogs, updateBlog, deleteBlog };
