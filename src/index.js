const path= require('path')
const express = require('express')
const port = 4000
const app = express()
var cors = require('cors')
app.use(cors())

var cookieParser = require('cookie-parser')

const handlebars = require('express-handlebars')
//HTTP logger//
const routes=require('./routes/router')
const db=require('./app/models/db.model')
db.connect()
// app.use(morgan('combined'));
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cookieParser())

app.use(express.static(path.join(__dirname,'public')));
app.engine('.hbs',handlebars.engine({extname:'.hbs'}));
app.set('view engine','hbs');
app.set('views',path.join(__dirname,'resources','views'));


routes(app)

app.listen(port, () => console.log(`App listening at http://localhost:${port}`))