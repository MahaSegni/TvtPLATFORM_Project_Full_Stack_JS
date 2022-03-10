const EvaluationModel = require('../Model/Evaluation');

module.exports.getEvaluation = (req, res) => {
  EvaluationModel.find((err, docs) => {
    if (!err) res.send(docs);
    else console.log("Error to get data : " + err);
  }).sort({ createdAt: -1 });
};

module.exports.getEvaluationById = (req, res) => {
  let id = req.params.id;
  EvaluationModel.findById({ _id: id }, (err, docs) => {
    res.send(docs);
  });
};

  module.exports.addEvaluation = async (req, res) => {
    new EvaluationModel({
      title: req.body.title,
      image: req.body.image,
      public: false,
      date: req.body.date,
    }).save();
  };

  module.exports.updateEvaluation = async (req, res, next) => {
    /* let fileName;
     if (req.file !== null) {
       try {
         if (
           req.file.detectedMimeType != "image/jpg" &&
           req.file.detectedMimeType != "image/png" &&
           req.file.detectedMimeType != "image/jpeg"
         )
           throw Error("invalid file");
   
         if (req.file.size > 500000) throw Error("max size");
       } catch (err) {
         const errors = err;
         return res.status(201).json({ errors });
       }
       fileName = Math.floor(Math.random()* Date.now()) + Date.now() + ".jpg";
   
       await pipeline(
         req.file.stream,
         fs.createWriteStream(
           `${__dirname}/../public/uploads/evaluation/${fileName}`
         )
       );
     }
   */
    let id = req.body._id;
    EvaluationModel.findByIdAndUpdate(
      id,
     
       { title: req.body.title},
    
      { new: true },
      (err, docs) => {
        if (!err)
          return res.send(docs);
        else
          return res.status(400).send("No update here : ");

      });


  };

  module.exports.deleteEvaluation = (req, res) => {
    console.log("ok")
    EvaluationModel.findByIdAndRemove(req.params.id, (err, docs) => {
       if (!err) res.send(docs);
       else console.log("Delete error : " + err);
  
      //res.redirect('/api/evaluation/get')
    });
  };