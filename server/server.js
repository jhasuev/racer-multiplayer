const PORT = 3000
const DOCROOT = "../dist/"

// 1. подключения модулей
const http = require("http")
const path = require("path")
const express = require("express")
const socketIO = require("socket.io")

// 2. создания сервера, используя express и http
const app = express()
const server = http.createServer(app)

// 3. отдача игры
const documentRoot = path.join(__dirname, DOCROOT)
const staticContent = express.static(documentRoot)
app.use(staticContent)

// 4. запускаем сервер
server.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
})

const io = socketIO(server)
io.on("connection", socket => {
  socket.emit("gameStart")
  console.log(`new user connected ${socket.id}`);
})
