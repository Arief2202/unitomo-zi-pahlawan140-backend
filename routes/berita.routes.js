module.exports = (app, express) => {
  let router = express.Router();
  const controller = require('../controllers/berita.controller');       //controller
  const verifyLoginToken = require('../middleware/auth.middleware');    //login middleware
  router.get('/', controller.getAll);                                   //get all data
  router.post('/', verifyLoginToken, controller.save);                  //create data
  router.get('/:beritaId', controller.get);                             //read data
  router.put('/:beritaId', verifyLoginToken, controller.update);        //update data
  router.delete('/:beritaId', verifyLoginToken, controller.delete);     //delete data
  app.use('/api/berita/', router);
}