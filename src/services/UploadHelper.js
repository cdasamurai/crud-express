const multer = require("multer");

const upload = multer({
    storage: multer.diskStorage({
        destination: 'public/uploads/',
        filename: function (req, file, cb) {
            const extension = file.mimetype.split('/')[1];
            const fileName = (new Date().getTime() / 1000 | 0) + '.' + extension;
            cb(null, fileName);
        }
    }),
    limits: {
        //make the limit of the file (third element)
        fileSize: 1024 * 1024 * 15 // MB
    },
    fileFilter: (req, file, cb) => {
        let valid = (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'application/pdf');
        cb(null, valid);
    },
});

module.exports = upload;