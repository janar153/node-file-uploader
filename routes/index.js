const express = require("express");
const router = express.Router();
const path= require("path");
const fs = require("fs");

router.get('/', (req, res) => {
   const { userContext } = req;

   const images = [];
   const uploads_path = path.resolve("./uploads");

   if (!fs.existsSync(uploads_path)){
      fs.mkdirSync(uploads_path);
   }

   fs.readdir(uploads_path, function(err, items){
      for (let i = 0; i < items.length; i++) {
         let filenameWithLocation = process.env.HOST_URL+"/files/"+items[i];
         let stats = fs.statSync(path.resolve(uploads_path+"/"+items[i]));

         images.push({filename: items[i], last_updated: stats.mtime.toLocaleString("et-EE"), src: filenameWithLocation});
      }

      res.render('index', { userContext, files: images, message: req.session.message });
      delete req.session.message;
   });
});

module.exports = router;