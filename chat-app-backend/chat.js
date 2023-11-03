const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const port = process.env.PORT || 3000;

app.use(express.static(__dirname + "/chat"));

// Web Socket
io.on("verbindung", (socket) => {
  console.log("Benutzer hat sich verbunden");

  socket.on("chat message", (message) => {
    io.emit("chat message", message); 
  });

  socket.on("abmelden", () => {
    console.log("Ein Benutzer hat sich abgemeldet");
  });
});

server.listen(port, () => {
  console.log(`Server läuft auf Port ${port}`);
});
