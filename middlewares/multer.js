const multer = require ("multer");
const uploads = multer({
    dest : '/uploads',limits:{
        fieldSize :1024 * 1024 *5 ,
    }
});
const multermid =uploads.single ("image");

module.exports = multermid 