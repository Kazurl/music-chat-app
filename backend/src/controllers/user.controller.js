

import cloudinary from "../lib/cloudinary.js";
import { Message } from "../models/message.model.js";
import { User } from "../models/user.model.js";

export const getAllUsers = async (req, res, next) => {
    try {
        const loggedInUserId = req.auth.userId; // possible to get curr userId cause of clerk
        const filteredUsers = await User.find({ clerkId: {$ne: loggedInUserId }});

        res.status(200).json(filteredUsers);
    } catch (error) {
        console.log("error in getAllUsers controller", error.message);
        next(error);
    }
};

// only get messages sent by curr user and selected user
export const getMessages = async (req, res, next) => {
    try {
        const { id: userToChatId } = req.params;
        const myId = req.auth.userId;

        // get all messages where curr user is sender || another user is sender
        const messages = await Message.find({
            $or: [
                { senderId: myId, receiverId: userToChatId },
                { senderId: userToChatId, receiverId: myId }
            ]
        });

        res.status(200).json(messages);
    } catch (error) {
        console.log("error in getMessages controller", error.message);
        next(error);
    }
};

// send either text or image with/ without text to specified user
export const sendMessage = async (req, res, next) => {
    try {
        const { text, image } = req.body;
        const { id: receiverId } = req.params;

        const senderId = req.auth.userId;

        let imageUrl = "";
        if (image) {
            // upload base64 image to cloudinary
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url;
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image: imageUrl,
        });

        // save to db
        await newMessage.save();

        // todo: socket.io realtime functionality

        res.status(200).json({ success: true, message: "Successfully sent message" });
    } catch (error) {
        console.log("error in sendMessage controller", error.message);
        next(error);
    }
};