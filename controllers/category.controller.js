const {category, Sequelize} = require('../models');
const {rs, re} = require('./function/rr_function');

let self = {};

self.getAll = (req, res) => {
  category.findAll().then((data) => {
    if(data.length > 0){
      rs(res, data);
    }else{
      re(res, false, 404, 'database empty');
    }
  }).catch((err) => {
    re(res, err);
  });
};

self.get = (req, res) => {
  category.findOne({
    where:{
      id: req.params.categoryId
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
  category.create(req.body).then((data) => {
    if(data){
      rs(res, data);
    }
    else{
      re(res, false, 400, 'create fail');
    }
  }).catch((err) => {
    re(res, err);
  });
};

self.update = (req, res) => {
  const dataGet = category.findOne({
    where:{
      id: req.params.categoryId
    },
  }).then((data) => {
    if(data){
      category.update(req.body, {
        where:{
          id: req.params.categoryId
        }
      }).then(async (data2) => {
        if(data2){
          const categoryResult = await category.findOne({where:{id: req.params.categoryId}});
          rs(res, categoryResult);
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
  category.destroy({
    where:{
      id: req.params.categoryId
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