const express = require("express");
const socket = require("socket.io");
const http = require("http");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = socket(server);

app.set("view engine", "ejs");
app.set(express.static(path.join(__dirname, "public")));
app.use(express.static("public"));

io.on("connection", function (socket) {
  console.log("connected");
  socket.on("send-location", function (data) {
    io.emit("receive-location", {
      id: socket.id,
      ...data,
    });
  });
  socket.on("disconnect", function () {
    io.emit("user-disconnected", socket.id);
  });
});

app.get("/", function (req, res) {
  res.render("index");
});

server.listen(8000, () => {
  console.log("Server Start");
});