import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
    {
        senderId: {  // clerk userid
            type: String,
            required: true,
        },
        receiverId: {  // clerk userid
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        image: {
            type: String,
        },
    },
    {timestamps: true}
);

export const Message = mongoose.model("Message", messageSchema);