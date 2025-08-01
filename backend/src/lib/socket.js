import { Server } from "socket.io";
import { Message } from "../models/message.model.js";

/*
    Listening to events:
        - socket.on (both server and client usage)
    Sending events:
        - io.emit (server -> client)
        - socket.emit (client -> server)
*/

export const initializeSocket = (server) => {
    const io = new Server(server, {
        cors: {
            origin: "http://localhost:3000",
            credentials: true
        },
        pingTimeout: 60000,  // 60s timeout for idle connections
    });

    // Store online users recorded on Socket
    const userSocketMap = new Map();  // {userId: socketId} i.e. { mongoose's ._id: socket.id}

    // Show activity of online users
    const userActivitiesMap = new Map();  // {userId: activity}

    // Listen to any incoming connections
    io.on("connection", (socket) => {
        // connecting user to socket
        socket.on("userConnected", (userId) => {
            console.log("A user connected", socket.id);

            userSocketMap.set(userId, socket.id);
            userActivitiesMap.set(userId, "Idle");

            // io.emit() is used to send events to all connected clients
            // here we broadcast to all connected clients that new user connected
            io.emit("userConnected", userId);

            // get activities of all online users
            socket.emit("usersOnline", Array.from(userSocketMap.keys()));
            io.emit("activities", Array.from(userActivitiesMap.entries()));
        });

        // when activity updated for user, event gets updated and broadcasted back to all
        socket.on("updateActivity", ({ userId, activity }) => {
            console.log("activityUpdated", userId, activity);
            userActivitiesMap.set( userId, activity );
            io.emit("activityUpdated", {userId, activity});
        });

        // sending message to online users in realtime
        socket.on("sendMessage", async (data) => {
            try {
                const { senderId, receiverId, content } = data;
                const message = await Message.create({
                    senderId,
                    receiverId,
                    content
                });

                const receiverSocketId = userSocketMap.get(receiverId);
                if (receiverSocketId) {
                    io.to(receiverSocketId).emit("receiveMessage", message);
                }

                // send message to sender as well, to update sender UI
                socket.emit("messageSent", message);
            } catch (error) {
                console.log("error in sendMessage socket.js: ", error);
                socket.emit("messageError", error.message);
            }
        });

        // When a user disconnects
        socket.on("disconnect", () => {
            let disconnectedUserId;
            for (const [userId, socketId] of userSocketMap.entries()) {
                // find user to disconnect
                if (socketId === socket.id) {
                    disconnectedUserId = userId;
                    userSocketMap.delete(userId);
                    userActivitiesMap.delete(userId);
                    break;
                }
            }

            if (disconnectedUserId) {
                console.log("A user disconnected", disconnectedUserId);
                io.emit("userDisconnected", disconnectedUserId);
            }
        });
        //console.log(userSocketMap);
    });
};