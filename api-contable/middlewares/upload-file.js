const multer = require('multer');
var fileExtension = require('file-extension')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
       cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, req.body._id+'-'+file.originalname);
    }
});
    
module.exports = multer({ storage });