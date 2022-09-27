const express = require("express")
const app = express()

app.use(express.static("public"))

const http = require("http").Server(app)
const PORT = process.env.PORT || 8000

const serverSocket = require("socket.io")(http)

http.listen(PORT, () => console.log(`Servidor iniciado em ${PORT}`))

app.get("/", (_, res) => res.sendFile(`${__dirname}/index.html`))

serverSocket.on("connect", socket => {
    console.log(`Cliente ${socket.id} conectou`)

    socket.on("chat msg", 
    msg => serverSocket.emit("chat msfg", `Msg recebida de ${socket.username}: ${msg}`))
    
    socket.on("login", username => {
        socket.username = username
        serverSocket.emit("chat msfg", `Cliente ${username} conectou`)
    })
})