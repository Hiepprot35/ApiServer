const path = require('path')
const cors = require('cors')
require('dotenv').config()
const http = require("http")
const express = require('express')
const port = process.env.APP_port;
const { Server } = require('socket.io')
const app = express()
const server = http.createServer(app);
const bodyParser = require('body-parser');
// const Host_URL = 'http://localhost:3000'

const Host_URL='https://tuanhiepprot3.netlify.app';

app.use(cors({
  origin: Host_URL,
  credentials: true,
  exposedHeaders: ["set-cookie"],
}));
// app.use(session({
//   secret: '1234',
//   resave: false,
//   saveUninitialized: true,
// }));
// app.use((req, res, next) => {
//   req.session.loginAttempts = req.session.loginAttempts || 0;
//   console.log( req.session.loginAttempts)
//   next();
// });
// app.use((req, res, next) => {
//   if (req.session.loginAttempts >= 3) {
//     return res.status(401).json({ message: 'Tài khoản đã bị khóa do nhập sai mật khẩu nhiều lần.' });
//   }
//   next();
// });
var cookieParser = require('cookie-parser')
app.use(bodyParser.json({ limit: '100mb' }));
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));

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
const io = new Server(server, {
  autoConnect: false,
  cors: {
    origin: [Host_URL, "https://admin.socket.io/"],
    methods: ["GET", "POST"],

  },
});
let users = [];
const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};


const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};
io.on("connection", (socket) => {
  socket.on("addUser", (userId) => {
    addUser(userId, socket.id);
 
    io.emit("getUsers", users);
  });
  socket.on("sendMessage", ({ sender_id, receiverId, content }) => {
    const user = getUser(receiverId)
    if (user) {
      io.to(user?.socketId).emit("getMessage", {
      
        sender_id,
        content,
      });
    }
  }
  
  
  );
  socket.on("UserSeen",({sender_id,receiverId,Seen_at})=>{
    const user=getUser(sender_id)
    
    if(user)
    {
      io.to(user?.socketId).emit("getUserSeen",Date.now());
    }
  }
  )
  socket.on("disconnect", () => {
    removeUser(socket.id);
    io.emit("getUsers", users);
    // console.log("dis",users)
  });
});
routes(app)
server.listen(port, () => console.log(`App listening at${port}}`))