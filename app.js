const http = require("http");
const express = require("express");
const path = require("path");
const socketio = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

// Set view engine (assuming you have EJS files)
app.set("view engine", "ejs");

// Set static directory (assuming your public folder exists)
app.use(express.static(path.join(__dirname, "public")));

// Handle socket connections
io.on("connection", (socket) => { // Using arrow function for clarity
  console.log("A user connected"); // Log connection for debugging

  socket.on("send-location", (data) => {
    io.emit("receive-location", { id: socket.id, ...data });
  });

  socket.on("disconnect", () => {
    io.emit("user-disconnected", socket.id);
  });
});

// Handle root path (assuming an index.ejs file exists)
app.get("/", (req, res) => {
  res.render("index");
});

// Start the server
const PORT = 2000;
server.listen(PORT, () => {
  const serverUrl = `http://localhost:${PORT}`;
  console.log(`Server listening on port ${PORT}`);
  console.log(`Open your browser and navigate to ${serverUrl}`);
});
