const multer = require('multer')
const path = require('path')


const storage = multer.diskStorage({
    destination: (req,file, cb)=>{
        cb(null, 'uploads/')
    },
    filename: (req,file,cb) =>{
        const uniqueName = Date.now() + '-' + file.originalname;
        cb(null, uniqueName);
    }
});

const fileFilter = (req,file, cb)=>{
    const allowedMimeTypes = ['image/', 'video/'];
    const isAllowed = allowedMimeTypes.some(type=>file.mimetype.startsWith(type));
    if (isAllowed) {
    cb(null, true);
  } else {
    cb(new Error('Only image and video files are allowed!'), false);
  }
}

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB
});

module.exports = upload