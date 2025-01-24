const auth = require('../controllers/login.controller');
const env = require('../config/get_env.js');


async function verifyLoginToken(req, res, next) {
  const token = req.header('token');
  if (!token) return res.status(401).json({ error: 'Access denied' });
  else{
    var decryptedToken;
    try{
      decryptedToken = auth.decrypt(token);
    } catch (e){
      return res.status(401).json({ error: 'Invalid Token' });
    }
    if(!decryptedToken) return res.status(500).json({ error: 'Internal Server Error' });
    if(decryptedToken.username == env.login_username){
      var login_success = await login.verify(env.login_password , decryptedToken.password);
      if(login_success) return await next();
      else return res.status(401).json({ error: 'Wrong Username or Password, please Relogin!' });
    }
    else return res.status(401).json({ error: 'Wrong Username or Password, please Relogin!' });
  }
};

module.exports = verifyLoginToken;