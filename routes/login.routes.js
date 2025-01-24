module.exports = (app, express) => {
  const bcrypt = require('bcrypt');
  login = require('../controllers/login.controller.js');
  let router = express.Router();

  router.get('/test/time', async(req, res) => { 
    res.json(Date())
  })

  router.post('/test/encrypt', (req, res) => {
    var data = JSON.stringify(req.body).toString();
    const encryptedData = login.encrypt(data)
    res.json(encryptedData)
  })

  router.post('/test/encrypt', (req, res) => {
    var data = JSON.stringify(req.body).toString();
    const encryptedData = login.encrypt(data)
    res.json(encryptedData)
  })
  
  router.post('/test/decrypt', (req, res) => {
    var data = req.body.token;
    const decryptedData = login.decrypt(data)
    res.json(decryptedData)
  })
  
  router.post('/test/hash', async (req, res) => {
    var data = req.body.password;
    var hashed = await login.hashPw(data);
    console.log(hashed);
    res.json(hashed);
  })
  
  router.post('/test/verify', async(req, res) => {
    var password = req.body.password;
    var hashed = req.body.hash;
    var decryptedData = await login.verify(password , hashed);
    res.json(decryptedData)
  })

  router.post('/test/verify', async(req, res) => {  
    var password = req.body.password;
    var hashed = req.body.hash;
    var decryptedData = await login.verify(password , hashed);
    res.json(decryptedData)
  })
  
  router.post('/login', async(req, res) => {
    var response = await login.generateToken(req.body.username, req.body.password);
    res.json(response, response.code)
  })

  app.use('/', router);
}