// encryption.js
env = require('../config/get_env.js');
const CryptoJS = require('crypto-js');
const bcrypt = require('bcrypt');

const {secret_key, secret_iv, login_username, login_password} = env
if (!secret_key || !secret_iv) {
  throw new Error('secretKey & secretIV are required on .env file')
}
if (!login_username || !login_password) {
  throw new Error('username & password, are required on .env file')
}

var key = CryptoJS.enc.Utf8.parse(secret_key);
var iv  = CryptoJS.enc.Utf8.parse(secret_iv);

function encrypt(data) {
  var encrypted = CryptoJS.AES.encrypt(data, key, { iv: iv }).toString();
  console.log(encrypted);
  return encrypted;
}

function decrypt(data) {
  var cryptText = data.toString();
  var cipherParams = CryptoJS.lib.CipherParams.create({
      ciphertext: CryptoJS.enc.Base64.parse(cryptText)
  });
  var decryptedFromText = CryptoJS.AES.decrypt(cipherParams, key, { iv: iv});
  return JSON.parse(decryptedFromText.toString(CryptoJS.enc.Utf8));
}

function encrypt(data) {
  var encrypted = CryptoJS.AES.encrypt(data, key, { iv: iv }).toString();
  return encrypted;
}

async function hashPw(password){
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword
}

async function verify(password , hash){
  const passwordMatched = await bcrypt.compare(password, hash);
  return passwordMatched
}
async function generateToken(username, password){
  if(username == login_username && password == login_password){
    hashed_pass = await hashPw(password);
    credential = {
      "username": username,
      "password": hashed_pass
    };
    token = encrypt(JSON.stringify(credential));
    return {
      "code": 200,
      "success": true,
      "status": "OK",
      "message": "Login Success",
      "token": token
    };
  }
  return {
    "code" : 203,
    "success": true,
    "status" : "FAILED",
    "message": "Login Failed, Wrong username or password!",
    "token": ""
  };
}

module.exports = {encrypt, decrypt, hashPw, verify, generateToken};