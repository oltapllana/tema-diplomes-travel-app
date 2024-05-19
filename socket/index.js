const { Server } = require("socket.io");

const io = new Server({ cors: { origin: "http://localhost:3001" } });
let users = {};

io.on("connection", (socket) => {
  socket.on("user", (userId) => {
    users[userId] = socket.id;
  });

  socket.on("terminateBooking", (userId, bookingId) => {
    console.log({ userId, bookingId });

    const targetSocketId = users[userId];
    if (targetSocketId) {
      io.to(targetSocketId).emit("bookingTerminated", { userId, bookingId });
    } else {
      console.log(`User with ID: ${userId} not connected.`);
    }
  });

  socket.on("disconnect", () => {
    for (let userId in users) {
      if (users[userId] === socket.id) {
        delete users[userId];
        console.log(`User with ID: ${userId} disconnected`);
        break;
      }
    }
  });
});

io.listen(3005);
