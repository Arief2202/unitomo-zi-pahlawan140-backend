const { Op } = require("sequelize");
const {carousel, Sequelize} = require('../models');
const {rs, re} = require('./function/rr_function');
const {join} = require('path')
const fs = require('fs');
const http = require("http");
const filePath = join(__dirname,`../public/uploads/carousels/`);

let self = {};

self.getAll = (req, res) => {
  carousel.findAll().then((data) => {
    if(data.length > 0){
      rs(res, data);
    }else{
      re(res, false, 404, 'database empty');
    }
  }).catch((err) => {
    re(res, err);
  });
};

self.active = (req, res) => {
  carousel.findAll({
    where:{
      active: 1
    },
  }).then((data) => {
    if(data){
      rs(res, data);
    }else{
      re(res, false, 410, 'this id doesnt exist');
    }
  }).catch((err) => {
    re(res, err);
  });
};

self.get = (req, res) => {
  carousel.findOne({
    where:{
      id: req.params.carouselId
    },
  }).then((data) => {
    if(data){
      rs(res, data);
    }else{
      re(res, false, 410, 'this id doesnt exist');
    }
  }).catch((err) => {
    re(res, err);
  });
};

self.save = (req, res) => {
  if(req.files != null){
    const file = req.files.gambar;
    const UFileName = `${new Date().getTime()}-${file.name.replaceAll(" ", "-")}`;
    file.mv(join(filePath,UFileName), (err) => {
      if (err) {
        re(res, err);
      }
      var dataModel = {};
      dataModel.image = "/uploads/carousels/"+UFileName;
      if(req.body.active) dataModel.active = req.body.active;
      carousel.create(dataModel).then((data) => {
        if(data){
          rs(res, data);
        }
        else{
          re(res, false, 400, 'create fail');
        }
      }).catch((err) => {
        re(res, err);
      });
    });
  }
  
};

self.update = async (req, res) => {
  await carousel.findOne({
    where:{
      id: req.params.carouselId
    },
  }).then((data) => {
    if(data){
      var dataModel = {};
      if(req.body.active) dataModel.active = req.body.active;
      if(req.files != null){
          const file = req.files.gambar;
          const UFileName = `${new Date().getTime()}-${file.name.replaceAll(" ", "-")}`;
          file.mv(join(filePath,UFileName), (err) => {
            if (err) {
              re(res, err);
            }
          });
          fs.rmSync(join(__dirname,"../public"+data.image), {
              force: true,
          });
          dataModel.image = "/uploads/carousels/"+UFileName;
      }
      carousel.update(dataModel, {
        where:{
          id: req.params.carouselId
        }
      }).then(async (data2) => {
        if(data2){
          const carousel_result = await carousel.findOne({where:{id: req.params.carouselId}});
          rs(res, carousel_result);
        }else{
          re(res, false, 400, 'update fail');
        }
      }).catch((err) => {
        re(res, err);
      });
    }else{
      re(res, false, 410, 'update failed, id not found');
    }
  }).catch((err) => {
    re(res, err);
  });
};

self.delete = (req, res) => {
  carousel.destroy({
    where:{
      id: req.params.carouselId
    }
  }).then((data) => {
    if(data){
      rs(res, data);
    }else{
      re(res, false, 400, 'delete failed, id not found');
    }
  }).catch((err) => {
    re(res, err);
  });
};

module.exports = self;