const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const fs = require("fs");
const config = require("./config");

let storageOptions = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './uploads');
    },
    filename: function(req, file, callback) {
        let originalName = file.originalname;
        let extension = originalName.split(".");

        callback(null, Date.now()+"."+extension[extension.length-1]);
    }
});

const upload = multer({ storage: storageOptions });
const hbs = require('hbs');
const logger = require('morgan');

const port = process.env.PORT || config.port;

const app = module.exports = express();
app.enable('trust proxy');
app.set('port', port);
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/views');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    let images = [];
    let path = __dirname + "/uploads";
    let host = req.headers.host;
    fs.readdir(path, function(err, items){
        for (let i = 0; i < items.length; i++) {
            let filenameWithLocation = "http://"+host+"/files/"+items[i];
            images.push(filenameWithLocation);
        }
        res.render('index.hbs', { files: images });
    });
});

app.post('/upload', upload.single('myFile'), (req, res) => {
    let filename = '';
    let uploadStatus = 'File upload failed!';

    if (req.file) {
        filename = req.file.filename;
        uploadStatus = 'File upload success!';
    }

    let images = [];
    let path = __dirname + "/uploads";
    let host = req.headers.host;
    fs.readdir(path, function(err, items){
        for (let i = 0; i < items.length; i++) {
            let filenameWithLocation = "http://"+host+"/files/"+items[i];
            images.push(filenameWithLocation);
        }
        res.render('index.hbs', { status: uploadStatus, filename: `http://${host}/files/${filename}`, files: images });
    });
});

app.get('/files/:file', (req, res) => {
    res.sendFile(__dirname + "/uploads/"+req.params.file);
});

app.listen(port, () => {
    console.log(`App is live on port ${port}`);
});
