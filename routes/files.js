const express = require("express");
const router = express.Router();
const path= require("path");
const fs = require("fs");

router.get('/:file', (req, res) => {
   const uploads_path = path.resolve("./uploads");
   res.sendFile(uploads_path + "/" + req.params.file);
});

router.get('/delete/:file', (req, res) => {
   const { userContext } = req;

   if (!userContext) {
      console.log("user not logged in");
      return res.redirect('/');
   }

   const file_path = path.resolve("./uploads/"+req.params.file);
   console.log(file_path, fs.existsSync(file_path));

   if (fs.existsSync(file_path)){
      try {
         fs.unlinkSync(file_path);
         req.session.message = "File deleted!";
         res.redirect('/');
      } catch(err) {
         console.error(err)
      }
   }

   return res.redirect('/');
});

module.exports = router;