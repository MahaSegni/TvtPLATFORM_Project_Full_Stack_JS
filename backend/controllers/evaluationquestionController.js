const EvaluationquestionModel = require('../Model/Evaluationquestion');

/*module.exports.getEvaluation = (req, res) => {
    EvaluationModel.find((err, docs) => {
      if (!err) res.send(docs);
      else console.log("Error to get data : " + err);
    }).sort({ createdAt: -1 });
  };
  
  module.exports.addEvaluation = async (req, res) => {
    let fileName;
  
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
        const errors = uploadErrors(err);
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
  
    const newEvaluation = new EvaluationModel({
      title: req.body.title,
      image: req.file !== null ? "./uploads/evaluation/" + fileName : "",
      date: today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate(),
      refquestions: [],
      refmodule: [],
    });
  
    try {
      const evaluation = await newEvaluation.save();
      return res.status(201).json(post);
    } catch (err) {
      return res.status(400).send(err);
    }
  };
  

  module.exports.updateEvaluation= async (req,res)=>{
    let fileName;
  
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
        const errors = uploadErrors(err);
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
  
    let id=req.body.id;
    Contact.findById({_id:id}, (err,doc)=>{
        doc.title= req.body.title;
        doc.image= req.file !== null ? "./uploads/evaluation/" + fileName : "",
        doc.save();
    })
};
  
  module.exports.deleteEvaluation = (req, res) => {
    if (!ObjectID.isValid(req.params.id))
      return res.status(400).send("ID unknown : " + req.params.id);
  
    EvaluationModel.findByIdAndRemove(req.params.id, (err, docs) => {
      if (!err) res.send(docs);
      else console.log("Delete error : " + err);
    });
  };*/