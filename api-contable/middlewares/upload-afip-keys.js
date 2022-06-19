const multer = require('multer');
var fileExtension = require('file-extension')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        var ext_split = file.mimetype.split('/');
        var file_ext= ext_split[1];
        if(file_ext =='key' || file_ext == 'pem'){
            cb(null, 'certificates');
        }        
    },
    filename: (req, file, cb) => {
        var ext_split = file.mimetype.split('/');
        var file_ext= ext_split[1];
        cb(null, req.body.businessId+'-'+req.body.puntoVenta+'.'+file_ext);
    }
});
    
module.exports = multer({ storage });