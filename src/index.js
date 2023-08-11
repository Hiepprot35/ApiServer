const path = require('path')
const express = require('express')
const port = 4000
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser');

app.use(cors({
    origin: 'https://tuanhiep.netlify.app',
    credentials: true,
  }));
var cookieParser = require('cookie-parser')
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

const handlebars = require('express-handlebars')
//HTTP logger//
const routes = require('./routes/router')
const db = require('./app/models/db.model')
db.connect()
// app.use(morgan('combined'));
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cookieParser())
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', 'https://tuanhiep.netlify.app'); // Thay đổi URL nguồn gốc tùy theo ứng dụng React của bạn
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use(express.static(path.join(__dirname, 'public')));
app.engine('.hbs', handlebars.engine({ extname: '.hbs' }));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));


routes(app)

app.listen(port, () => console.log(`App listening at http://localhost:${port}`))