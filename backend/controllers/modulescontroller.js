const ModuleModel = require("../Model/Module.js");
const UserModel = require("../Model/User.js");
const puppeteer = require('puppeteer');
const cloudinary = require("../utils/cloudinary");
const CategorieModel = require("../Model/CategorieModule");
const mongoose = require("mongoose");
module.exports = {
  getModule: async (req, res) => {
    try {
      res
        .status(200)
        .json(
          await ModuleModel.find({})
          //.populate("idowner")
          // .populate("refStudents")
        );
    } catch (error) {
      res.status(404).json({ statue: false, message: error.message });
    }
  },
  getToken: async (req, res) => {
    UserTok = await UserModel.findOne({ token: req.headers['authorization'] })
    if (UserTok == null) {
      return res.send('authorization failed')
    } else {
      res.send('authorization succeeded')
    }
  },
  moduleReco: async (req, res) => {
    try {
      let List = []
      const browser = await puppeteer.launch({ headless: true });
      const page = await browser.newPage();
      console.log(req.params.id);
    /*  if(req.params.cate==""){
        const urls = [
          "https://www.edx.org/search?tab=course&page=1",
          "https://www.edx.org/search?tab=course&page=2",
          "https://www.edx.org/search?tab=course&page=3",
         
        ]
      }else{ */
      const urls = [
        "https://www.edx.org/search?tab=course&subject="+req.params.id+"&page=1",
        "https://www.edx.org/search?tab=course&subject="+req.params.id+"&page=2",
       
      ]
    //}
      /*await page.goto(`https://www.edx.org/search?tab=course&page=2`, {
        waitUntil: 'load',
        timeout: 0,
      });*/
      for (let i = 0; i < urls.length; i++) {

        const promise = page.waitForNavigation({ waitUntil: 'networkidle2' });
        await page.goto(`${urls[i]}`);
        await promise;
        const modules = await page.evaluate(() => {
          let module = [];
          let elements = document.querySelectorAll('div.discovery-card');
          for (element of elements) {
            module.push({
              img: element.querySelector('img.d-card-hero-image')?.src,
              title: element.querySelector('div.d-card-body').querySelector('h3.h4').querySelector('span').querySelector('span').querySelector('span').innerText,
              lien: 'https://www.edx.org/' + element.querySelector('a.discovery-card-link').getAttribute("href"),
            })
          }
          return module;
        })
        List.push.apply(List, modules)
      }
      await browser.close();
      let number = Math.floor(Math.random() * (List.length - 3))
      // if(List.length >0) 
      res.send(List.slice(number, number + 3))
      // else  res.status(401).send();
      //res.send(modules.slice(6,-2))
    } catch (err) {
      res.status(401).send();
    }
  },
  categoryrecom: async (req, res) => {
    try {
      let List = []
      const browser = await puppeteer.launch({ headless: true });
      const page = await browser.newPage();
      const urls = [
        "https://www.edx.org/search?tab=course",
        
      ]
      /*await page.goto(`https://www.edx.org/search?tab=course&page=2`, {
        waitUntil: 'load',
        timeout: 0,
      });*/


      await page.goto(`https://www.edx.org/search?tab=course`, {
        waitUntil: 'load',
        timeout: 0,
      });
        const modules = await page.evaluate(() => {
          let module = [];
          let elements = document.querySelectorAll('div.search-refinements');
          for (element of elements) {
            module.push({
              
              title: element.querySelector('div.collapsible').querySelector('div.collapsible-body').querySelector('div.pgn__menu').querySelector('label.pgn__form-label').querySelector('span.refinement-option-label').innerText,
              })
          }
          return module;
        })
        
      await browser.close();
    console.log(modules)
      res.send(modules)
   
    } catch (err) {
      res.status(401).send();
    }
  },
  getModuleById: async (req, res) => {
    try {
      res
        .status(200)
        .json(
          await ModuleModel.findById(req.params.id)

        );
    } catch (error) {
      res.status(404).json({ statue: false, message: error.message });
    }
  },
  getModuleBylabel: async (req, res) => {
    try {
      res
        .status(200)
        .json(
          await ModuleModel.findOne({ label: req.params.label })

        );
    } catch (error) {
      res.status(404).json({ statue: false, message: error.message });
    }
  },

  addModule: async (req, res) => {
    const newModule = new ModuleModel({
      label: req.body.label,
      description: req.body.description,
      image: req.body.image,
      date_creation: req.body.date_creation,
      statusModule: false,
      idowner: req.body.idowner,
    });
    try {
      const data = await newModule.save();
      res.status(201).json({
        statue: true,
        message: "Module Added Succefully",
        result: data,
      });
    } catch (error) {
      res.status(400).json({ statue: false, message: error.message });
    }
  },
  updateModule: async (req, res) => {
    // console.log(req.body);
    let modul = await ModuleModel.findById(req.body._id);
    modul.label = req.body.label
    modul.description = req.body.description
    modul.image = req.body.image
    modul.date_update = new Date()
    modul.save()
    return res.send(modul)
  },
  updateModuleRating: async (req, res) => {
    ModuleModel.findByIdAndUpdate(
      req.params.id,
      {
        $push: {
          rating: {
            user: req.body.user,
            ratemodule: req.body.ratemodule,
          },
        },
      },
      { new: true },
      (err, docs) => {
        if (!err) {
          return res.send(docs);
          console.log(docs);
        }
        else return res.status(400).send(err);
      }
    )
  },
  editrating: (req, res) => {
    ModuleModel.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          rating: {
            user: req.body.user,
            ratemodule: req.body.ratemodule,
            
          },
        },
      },
      { new: true },
      (err, docs) => {
        if (!err) {
console.log(req.body.ratemodule)
          return res.send(docs);

        }
        else return res.status(400).send(err);
      }
    )
  },
  deleteModule: async (req, res) => {
    try {
      const dataFind = await CategorieModel.updateMany({
        $pull: { modules: req.params.id },
      });
      const dataFind1 = await UserModel.updateMany(

        {
          $pull: { refmodules: req.params.id },
        }
      );

      const data = await ModuleModel.findByIdAndRemove(req.params.id);
      res.status(201).json({
        statue: true,
        message: "Module Deleted Succefully",
        result: data,
      });
    } catch (error) {
      res.status(400).json({ statue: false, message: error.message });
    }
  },
  deleteAllModules: async (req, res) => {
    try {
      const data = await ModuleModel.remove({});
      res.status(201).json({
        statue: true,
        message: "Module Deleted Succefully",
        result: data,
      });
    } catch (error) {
      res.status(400).json({ statue: false, message: error.message });
    }
  },
  addUserToModule: async (req, res) => {
    try {
      const dataFind1 = await UserModel.findOne(
        { _id: req.params.idUser });
      const dataFind = await UserModel.updateOne(
        { _id: req.params.idUser },
        {
          $push: { refmodules: req.params.id },
        }
      );
      const dataUpdate = await ModuleModel.updateOne(
        { _id: req.params.id },
        {
          $push: { refStudents: [dataFind1._id] },
        }
      );
      res.status(201).json({
        statue: true,
        message: "Module Updated Succefully",
        result: dataUpdate,
      });
    } catch (error) {
      res.status(400).json({ statue: false, message: error.message });
    }
  },
  removeUserFromModule: async (req, res) => {
    try {
      const dataFind = await UserModel.findById(req.params.idUser);

      const dataFind1 = await UserModel.updateOne(
        { _id: req.params.idUser },
        {
          $pull: { refmodules: req.params.id },
        }
      );
      const dataUpdate = await ModuleModel.findByIdAndUpdate(
        req.params.id,
        { $pullAll: { refStudents: [dataFind._id] } },
        { safe: true }
      );
      res.status(201).json({
        statue: true,
        message: "Module Updated Succefully User Removed",
        result: dataUpdate,
      });
    } catch (error) {
      res.status(400).json({ statue: false, message: error.message });
    }
  },
  verifowner: async (req, res) => {
    const dataUpdate = await ModuleModel.findOne(
      { _id: req.params.id },
      { $pullAll: { refStudents } },

    );
    let owner = null;
    if (dataUpdate.refStudents._id == req.params.id) {
      owner = true;
    } else {
      owner = false;
    }
    res.send(owner);
  },
  getUserByEmail: async (req, res) => {
    try {
      const dataFind = await UserModel.findOne({ email: req.params.email });
      res.status(201).json(dataFind);
    } catch (error) {
      res.status(400).json({ statue: false, message: error.message });
    }
  },
  getUserByid: async (req, res) => {
    try {
      const dataFind = await UserModel.findOne({ _id: req.params._id });
      res.status(201).json(dataFind);
    } catch (error) {
      res.status(400).json({ statue: false, message: error.message });
    }
  },
  uploadPicture: async (req, res) => {
    /* let modul = await ModuleModel.findById(req.params.id)
     modul.image = req.file.filename
     modul.save()
     res.send("err")*/
    try {
      ModuleModel.findById(req.params.id, async (err, module) => {
        const result = await cloudinary.uploader.upload(req.file.path);
        if (result) {
          module.image = result.secure_url
          module.save()
          res.status(200).send(module.image)
        }
        else {
          res.status(500).send()
        }
      })
    } catch (err) {
      res.send(err)
    }
  },


  getOwner: async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
      return res.status(400).send("ID unknown : " + req.params.id);
    UserModle.findById(req.params.id, (err, docs) => {
      if (!err) res.send(docs);
      else console.log("Error to get data : " + err);
    })
  },



  moduleReco1: async (req, res) => {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto(`https://www.futurelearn.com/courses`);
    const modulesl = await page.evaluate(() => {
      let modulesl = [];
      let elements = document.querySelectorAll('div.cardGrid-wrapper_2TvtF');
      for (element of elements) {
        modulesl.push({
          img: element.querySelector('a.link-wrapper_1GLAu').querySelector('div.Image-wrapper_2xvdD').querySelector('img')?.src,
          title: element.querySelector('div.Body-wrapper_1NnVP').querySelector('a').querySelector('div.Content-wrapper_1O_KH').querySelector('div.Title-wrapper_11axP').querySelector('h3').textContent.trim(),
          lien: 'https://www.futurelearn.com' + element.querySelector('a.index-module_anchor__24Vxj').getAttribute("href"),
        })
      }
      return modulesl;
    });
    // console.log(modulesl);
    res.send(modulesl)
    await browser.close();
  }
};
