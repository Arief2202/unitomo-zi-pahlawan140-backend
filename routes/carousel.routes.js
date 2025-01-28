module.exports = (app, express) => {
  let router = express.Router();
  const controller = require('../controllers/carousel.controller');   //controller
  const verifyLoginToken = require('../middleware/auth.middleware');  //login middleware
  router.get('/all', controller.getAll);                              //get data by categoryId
  router.get('/active', controller.active);                           //get data by categoryId
  router.get('/', controller.active);                                 //get all data
  router.post('/', verifyLoginToken, controller.save);                //create data
  router.get('/:carouselId', controller.get);                         //read data
  router.put('/:carouselId', verifyLoginToken, controller.update);    //update data
  router.delete('/:carouselId', verifyLoginToken, controller.delete); //delete data
  app.use('/api/carousel/', router);
}