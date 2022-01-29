

const multer = require('multer')
const { createWorker } = require('tesseract.js');
const worker = createWorker();
const fs = require('fs');


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/beforeOcr')
    },
    filename: (req, file, cb) => {
        cb(null, 'file-' + Date.now() + '.' +
        file.originalname.split('.')[file.originalname.split('.').length-1])}
})

exports.ocr = multer({ storage: storage }).single('file')