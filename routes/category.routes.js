module.exports = (app, express) => {
  let router = express.Router();
  const controller = require('../controllers/category.controller');         //controller
  const verifyLoginToken = require('../middleware/auth.middleware');        //login middleware
  router.get('/', controller.getAll);                                       //get all data
  router.post('/', verifyLoginToken, controller.save);                      //create data
  router.get('/:categoryId', controller.get);                                 //read data
  router.put('/:categoryId', verifyLoginToken, controller.update);            //update data
  router.delete('/:categoryId', verifyLoginToken, controller.delete);         //delete data
  app.use('/api/category/', router);
}