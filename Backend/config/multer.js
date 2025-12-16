const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Create uploads directory if it doesn't exist
const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const imagesDir = path.join(uploadDir, 'images');
const videosDir = path.join(uploadDir, 'videos');

if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir, { recursive: true });
}
if (!fs.existsSync(videosDir)) {
    fs.mkdirSync(videosDir, { recursive: true });
}

// Storage configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (file.fieldname === 'images') {
            cb(null, imagesDir);
        } else if (file.fieldname === 'videos') {
            cb(null, videosDir);
        } else {
            cb(null, uploadDir);
        }
    },
    filename: (req, file, cb) => {
        const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1E9) + path.extname(file.originalname);
        cb(null, uniqueName);
    }
});

// File filter
const fileFilter = (req, file, cb) => {
    // Allowed image types
    const imageTypes = /jpeg|jpg|png|gif|webp/;
    // Allowed video types
    const videoTypes = /mp4|avi|mov|mkv|flv|wmv|webm/;
    
    const extname = imageTypes.test(path.extname(file.originalname).toLowerCase());
    const mimeType = imageTypes.test(file.mimetype);
    
    if (file.fieldname === 'images') {
        if (extname || mimeType) {
            return cb(null, true);
        } else {
            cb(new Error('Only image files are allowed for images field'));
        }
    } else if (file.fieldname === 'videos') {
        const videoExt = videoTypes.test(path.extname(file.originalname).toLowerCase());
        const videoMime = videoTypes.test(file.mimetype);
        
        if (videoExt || videoMime) {
            return cb(null, true);
        } else {
            cb(new Error('Only video files are allowed for videos field'));
        }
    } else {
        cb(null, true);
    }
};

// Multer upload configuration
const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 100 * 1024 * 1024 
    }
});

module.exports = upload;
