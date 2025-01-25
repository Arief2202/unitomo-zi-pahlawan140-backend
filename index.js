dotenv = require('dotenv');
dotenv.config()
const express = require('express')
const app = express()
const cors = require('cors')
// const fileUpload = require("express-fileupload")
const helpers = require('handlebars-helpers')();
const router = express.Router()
const port = process.env.SERVER_PORT

app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
process.env.TZ = process.env.SERVER_TIMEZONE

require('./routes/login.routes')(app, express);
require('./routes/berita.routes')(app, express);
require('./routes/category.routes')(app, express);

// require('./routes/link.routes')(app, express);
// require('./routes/luki.routes')(app, express);
// require('./routes/zirb.routes')(app, express);
// require('./routes/layanan.routes')(app, express);
// require('./routes/aplikasi.routes')(app, express);
// require('./routes/sertifikat.routes')(app, express);
// require('./routes/pegawai.routes')(app, express);
// require('./routes/banner.routes')(app, express);
// require('./routes/magangacc.routes')(app, express);
// require('./routes/login.routes')(app, express);
// require('./routes/video.routes')(app, express);
// require('./routes/menu.routes')(app, express);
// require('./routes/submenu.routes')(app, express);


module.exports = app;
app.listen(port, () => {
  console.log(`app running at http://localhost:${port}`)
})