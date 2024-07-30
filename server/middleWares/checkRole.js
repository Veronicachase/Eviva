const checkRole =(role)=>{
    return function (req, res, next){
        const userRole = req.user.role;
        if (role.includes(userRole)){
            next();
        } else {
            res.status (403).send ("Access denied. privilegios insuficientes.")
        }
    }

};

module.exports = checkRole;