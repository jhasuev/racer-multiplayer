const socketIO = require("socket.io")

module.exports = {
  init(server) {
    this.sessions = []
    this.io = socketIO(server)
    this.io.on("connection", socket => {
      socket.on("playerMove", data => {
        this.onPlayerMove(socket, data)
      })
      this.onConnection(socket)
    })
  },

  onPlayerMove(socket, data) {
    const session = this.sessions.find(session => session.playerSocket === socket || session.enemySocket === socket)
    let enemySocket = session.playerSocket === socket ? session.enemySocket : session.playerSocket
    enemySocket.emit("enemyMove", data)
  },

  getPendingSession() {
    return this.sessions.find(session => session.playerSocket && !session.enemySocket)
  },

  createPendingSession(socket) {
    this.sessions.push({
      playerSocket: socket,
      enemySocket: null,
    })
  },

  startGame(session) {
    session.playerSocket.emit("gameStart", { master: true })
    session.enemySocket.emit("gameStart")
  },

  onConnection(socket) {
    console.log(`new user connected ${socket.id}`);

    let session = this.getPendingSession()

    if (!session) {
      this.createPendingSession(socket)
    } else {
      session.enemySocket = socket
      this.startGame(session)
    }
  }
}
