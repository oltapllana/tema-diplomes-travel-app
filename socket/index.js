const { Server } = require("socket.io");

const io = new Server({ cors: { origin: "http://localhost:3001" } });
let onlineUser = [];
io.on("connection", (socket) => {
  console.log("new connection", socket.id);

  //listen to a connection
  socket.on("addNewUser", (userId) => {
    onlineUser.push({
      userId,
      socketId: socket.id,
    });
    console.log(onlineUser);
  });

  socket.on("terminateBooking", (userId, bookingId) => {
    console.log({ userId, bookingId });

    const user = onlineUser.find((user) => user.userId === userId);
    if (user) {
      io.to(user.socketId).emit("bookingTerminated", { userId, bookingId });
    }
  });
});

io.listen(3005);
