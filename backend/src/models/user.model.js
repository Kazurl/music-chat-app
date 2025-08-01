import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {   
        fullName: {
            type: String,
            required: true,
        },
        imageUrl: {
            type: String,
            required: true,
        },
        clerkId: {  // in the event that user logs in using clerk, need ref
            type: String,
            required: true,
            unique: true,
        },
    },
    { timestamps: true }  // gives us the "Created At", "Updated At" fields
);

export const User = mongoose.model("User", userSchema);