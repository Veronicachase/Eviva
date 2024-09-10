
const multer = require('multer');
const path = require('path');


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); 
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); 
  },
});


const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = ['image/jpeg', 'image/png', 'video/mp4', 'video/mov'];
  
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true); 
  } else {
    cb(new Error('File type allow mp4, mov, jpg, png'), false);
  }
};


const upload = multer({
  storage: storage,
  limits: { fileSize: 100 * 1024 * 1024 }, 
  fileFilter: fileFilter
});

module.exports = upload;
