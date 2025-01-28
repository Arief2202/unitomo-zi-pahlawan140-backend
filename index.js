dotenv = require('dotenv');
dotenv.config()
const express = require('express')
const app = express()
const cors = require('cors')
const fileUpload = require('express-fileupload');
var path = require('path');
const helpers = require('handlebars-helpers')();
const router = express.Router()
const port = process.env.SERVER_PORT

app.use(fileUpload());
app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(express.static('public'))
process.env.TZ = process.env.SERVER_TIMEZONE

require('./routes/login.routes')(app, express);
require('./routes/berita.routes')(app, express);
require('./routes/category.routes')(app, express);
require('./routes/carousel.routes')(app, express);

module.exports = app;
app.listen(port, () => {
  console.log(`app running at http://localhost:${port}`)
})