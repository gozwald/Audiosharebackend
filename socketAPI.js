var socket_io = require("socket.io");
var io = socket_io();
var socketApi = {};

socketApi.io = io;

io.on("connection", function (socket) {
  console.log("A user is connected to" + socket.id);
  socket.on("disconnect", () => console.log("Client disconnected"));
});

module.exports = socketApi;
