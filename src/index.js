const path = require('path')
const cors=require('cors')
require('dotenv').config()
const http=require("http")
const express = require('express')
const port = process.env.APP_port;
const {Server}=require('socket.io')
const app = express()
const server = http.createServer(app);

const bodyParser = require('body-parser');
const Host_URL = 'http://localhost:3000'
// const Host_URL='https://tuanhiepprot3.netlify.app';

app.use(cors({
    origin: Host_URL,
    credentials: true,
    exposedHeaders: ["set-cookie"] ,

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

app.use(cors({
  origin: Host_URL,
  methods: 'GET, POST, PUT, DELETE',
  allowedHeaders: 'Content-Type, Authorization',
  credentials: true
}));
app.use(express.static(path.join(__dirname, 'public')));
app.engine('.hbs', handlebars.engine({ extname: '.hbs' }));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));
const io=new Server(server,{
  autoConnect: false,
  cors:{
    origin:Host_URL,
    methods:["GET","POST"],
  
  },
});
io.on("connection",(socket)=>{
  console.log(`User Connected: ${socket.id}`);
  socket.on("SendMessage",(data)=> {
    console.log(data)
    socket.broadcast.emit("recevie_messsage",data)
  })
 
})
routes(app)

server.listen(port, () => console.log(`App listening at http://localhost:${port}`))