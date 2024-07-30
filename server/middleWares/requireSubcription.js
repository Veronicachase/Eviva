//Verificando su el usuario tiene una suscripción activa

 const requireSubscription = (req, res, next) => {
    if (!req.user || !req.user.subscription) {
      return res.status(403).send('Acceso denegado. Se requiere una suscripción activa.');
    }
    next();
  };

  module.exports = requireSubscription;