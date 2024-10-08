const requireAdmin =(req, res, next)=> {
    if (!req.user || req.user.role !=='admin'){
        return res.status(403).send("Access denied. Admin permits required"); 
    }
    next()
};

module.exports = requireAdmin;