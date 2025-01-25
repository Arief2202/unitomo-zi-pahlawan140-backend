const {news, category, Sequelize} = require('../models');
const {rs, re} = require('./function/rr_function');

let self = {};

self.getAll = (req, res) => {
  news.findAll({
    include: [
      'categories',
    ],
}).then((data) => {
    if(data.length > 0){
      rs(res, data);
    }else{
      re(res, false, 404, 'database empty');
    }
  }).catch((err) => {
    re(res, err);
  });
};

self.getByCategoryId = (req, res) => {
  news.findAll({
    include: [
      'categories',
    ],
    where:{
      categoryId: req.params.categoryId
    },
  }).then((data) => {
    if(data){
      rs(res, data);
    }else{
      re(res, false, 410, 'this data with this category id doesnt exist');
    }
  }).catch((err) => {
    re(res, err);
  });
};

self.getByCategoryName = (req, res) => {
  category.findOne({
    where:{
      categoryName: req.params.categoryName
    },
  }).then((data) => {
    if(data){
      news.findAll({
        include: [
          'categories',
        ],
        where:{
          categoryId: data.id
        },
      }).then((data) => {
        if(data){
          rs(res, data);
        }else{
          re(res, false, 410, 'this data with this category id doesnt exist');
        }
      }).catch((err) => {
        re(res, err);
      });
    }else{
      re(res, false, 410, 'this category name doesnt exist');
    }
  }).catch((err) => {
    re(res, err);
  });
};

self.get = (req, res) => {
  news.findOne({
    include: [
      'categories',
    ],
    where:{
      id: req.params.beritaId
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
  news.create(req.body).then((data) => {
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
  news.update(req.body, {
    where:{
      id: req.params.beritaId
    }
  }).then((data) => {
    if(data){
      rs(res, data);
    }else{
      re(res, false, 400, 'update fail');
    }
  }).catch((err) => {
    re(res, err);
  });
};

self.delete = (req, res) => {
  news.destroy({
    where:{
      id: req.params.beritaId
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