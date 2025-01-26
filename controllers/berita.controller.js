const { Op } = require("sequelize");
const {news, category, Sequelize} = require('../models');
const {rs, re} = require('./function/rr_function');
const {join} = require('path')
const fs = require('fs');
const http = require("http");
const filePath = join(__dirname,`../public/uploads/news/`);
const path = join(__dirname,`../public/`);

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

self.search = (req, res) => {
  news.findAll({
    include: [
      'categories',
    ],
    where: {
      [Op.or]: [
        { 'title': { [Op.like]: '%' + req.params.keyword + '%' } },
        { '$content$': { [Op.like]: '%' + req.params.keyword + '%' } }
      ]
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
  if(req.files != null){
    const file = req.files.gambar;
    const UFileName = `${new Date().getTime()}-${file.name.replaceAll(" ", "-")}`;
    file.mv(join(filePath,UFileName), (err) => {
      if (err) {
        re(res, err);
      }
      dataModel = {
        categoryId: req.body.categoryId,
        author: req.body.author,
        title: req.body.title,
        imageDesc: req.body.imageDesc,
        imageSource: req.body.imageSource,
        content: req.body.content,
        image: "/uploads/news/"+UFileName,
      }
        news.create(dataModel).then((data) => {
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

self.update = (req, res) => {
  news.findOne({
    where:{
      id: req.params.beritaId
    },
  }).then((data) => {
    if(data){
      news.update(req.body, {
        where:{
          id: req.params.beritaId
        }
      }).then(async (data2) => {
        if(data2){
          const beritaResult = await news.findOne({where:{id: req.params.beritaId}});
          rs(res, beritaResult);
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