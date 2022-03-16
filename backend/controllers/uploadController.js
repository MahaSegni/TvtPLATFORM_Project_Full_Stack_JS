const multer = require('multer');
const { pipeline } = require('stream');
const fs = require("fs");

module.exports.Evaluationupload = async (req, res) => {
    
    console.log(req);
    var newpath="C:/Users/Emna/Desktop/projetMERN/Project_Full_Stack_JS/frontend/src/assets"+req.body.filename;
/*
    const storage = multer.diskStorage({
        destination: function(re, file, callback) {
          callback(null, "../../frontend/src/assets");
        },
        filename: function (re, file, callback) {
          callback(null, req.body.filename);
        }
      });
      var uploadFiles = multer({ storage: storage }).single("file");
      var uploadFilesMiddleware = util.promisify(uploadFiles);*/
     /* 
    pipeline(
        req.file.stream,
        fs.createWriteStream(
          newpath
        ));
  
*/
console.log(req.file.stream)
return res.send(200)
}