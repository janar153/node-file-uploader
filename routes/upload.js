const express = require("express");
const router = express.Router();
const multer = require('multer');
const path= require("path");
const helpers = require("./../helpers");

let storageOptions = multer.diskStorage({
   destination: function (req, file, callback) {
      const uploads_path = path.resolve("./uploads");
      callback(null, uploads_path);
   },
   filename: function(req, file, callback) {
      let originalName = file.originalname;
      let extension = originalName.split(".");

      callback(null, Date.now()+"."+extension[extension.length-1]);
   }
});

router.get('/', (req, res) => {
   const { userContext } = req;
   res.render('upload', { userContext, message: req.session.message });
   delete req.session.message;
});

router.post('/', (req, res) => {
   const { userContext } = req;

   const upload = multer({
      storage: storageOptions,
      fileFilter: helpers.imageFilter
   }).single('myFile');
   upload(req, res, function(err) {
      let message = "File upload success!";
      let success = true;
      if(req.fileValidationError) {
         message = req.fileValidationError;
         success = false;
      } else if(!req.file) {
         message = "Please select an image to upload";
         success = false;
      } else if(err) {
         message = err.toString();
         success = false;
      }

      req.session.message = message;

      if(success) {
         return res.redirect('/');
      } else {
         console.log("upload failed, got error", req.session.message, message);
         res.render('upload', { userContext, message: message });
      }

   });

});

module.exports = router;