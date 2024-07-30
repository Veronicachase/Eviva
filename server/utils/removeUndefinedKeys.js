const removeUndefinedKeys =  (obj) => {
    try {
      // Itera sobre todas las claves del objeto
      Object.keys(obj).forEach((key) => {
        
        if (obj[key] === undefined || obj[key] === "" || (Array.isArray(obj[key]) && obj[key].length === 0)) {
          
          delete obj[key]
        }
      });
      return obj;
    } catch (error) {
      throw new Error(error.message);
    }
  };
  
  module.exports = { removeUndefinedKeys };