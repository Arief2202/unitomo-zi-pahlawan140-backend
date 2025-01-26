module.exports = (app, express) => {
  let router = express.Router();
  const controller = require('../controllers/berita.controller');           //controller
  const verifyLoginToken = require('../middleware/auth.middleware');        //login middleware
  router.get('/search/:keyword', controller.search);       //get data by categoryId
  router.get('/category/id/:categoryId', controller.getByCategoryId);       //get data by categoryId
  router.get('/category/name/:categoryName', controller.getByCategoryName); //get data by categoryId
  router.get('/', controller.getAll);                                       //get all data
  router.post('/', verifyLoginToken, controller.save);                      //create data
  router.get('/:beritaId', controller.get);                                 //read data
  router.put('/:beritaId', verifyLoginToken, controller.update);            //update data
  router.delete('/:beritaId', verifyLoginToken, controller.delete);         //delete data
  app.use('/api/berita/', router);
}