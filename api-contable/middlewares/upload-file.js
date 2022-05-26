const multer = require('multer');
var fileExtension = require('file-extension')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        console.log(file.mimetype);
        var ext_split = file.mimetype.split('/');
        var file_ext= ext_split[1];
        console.log(file_ext);
        if(file_ext =='png' || file_ext == 'jpg'|| file_ext == 'gif' || file_ext =='jpeg'){
            cb(null, 'uploads/images/');
        }else{
            cb(null, 'uploads/');
        }
        
    },
    filename: (req, file, cb) => {
        cb(null, Date.now()+'-'+file.originalname);
    }
});
    
module.exports = multer({ storage });