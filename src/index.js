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
    console.log("--------------------")
    console.log("Socket",socket.id)
    io.emit("getUsers", users);
  });
  socket.on("sendMessage", ({ sender_id, receiverId, content }) => {
    const user = getUser(receiverId)
    if (user) {
      console.log("Send to:",user.socketId)
      console.log("-----------------------------")
      io.to(user?.socketId).emit("getMessage", {
      
        sender_id,
        content,
      });
    }
  }
  );
  // socket.on("disconnect", () => {
  //   // Tìm và xóa kết nối socket của người dùng khỏi đối tượng users
  //   const userId = Object.keys(users).find((key) => users[key] === socket.id);
  //   if (userId) {
  //     delete users[userId];
  //   }
  //   console.log("Logout")
  // });
});
routes(app)
server.listen(port, () => console.log(`App listening at http://localhost:${port}`))