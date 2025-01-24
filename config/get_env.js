// config.js
dotenv = require('dotenv');
dotenv.config()

module.exports = {
    secret_key: process.env.SECRET_KEY,
    secret_iv: process.env.SECRET_IV,
    login_username: process.env.LOGIN_USERNAME,
    login_password: process.env.LOGIN_PASSWORD,
    timezone: process.env.SERVER_TIMEZONE,
};  