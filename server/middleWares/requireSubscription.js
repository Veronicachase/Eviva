//Verificando su el usuario tiene una suscripción activa

 const requireSubscription = (req, res, next) => {
    if (!req.user || !req.user.subscription) {
      return res.status(403).send('Subscription required to access this content.');
    }
    next();
  };

  module.exports = requireSubscription;