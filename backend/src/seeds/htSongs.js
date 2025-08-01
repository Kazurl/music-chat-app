import mongoose from "mongoose";
import { Song } from "../models/song.model.js";
import { config } from "dotenv";

config();

const songs = [
    {
        title: "心淡",
        artist: "Joey Yung",
        imageUrl: "/cover-images/心淡_JoeyYung.jpeg",
        audioUrl: "/songs/心淡.mp3",
        duration: 248, // 4:08
    },
    {
        title: "到此為止",
        artist: "Shiga Lin",
        imageUrl: "/cover-images/到此为止_ShigaLin.jpeg",
        audioUrl: "/songs/到此為止.mp3",
        duration: 257, // 4:17
    },
    {
        title: "好好過",
        artist: "Shiga Lin",
        imageUrl: "/cover-images/好好过_ShigaLin.jpeg",
        audioUrl: "/songs/好好過.mp3",
        duration: 281, // 4:41
    },
    {
        title: "舊街角",
        artist: "Shiga Lin",
        imageUrl: "/cover-images/舊街角_ShigaLin.jpeg",
        audioUrl: "/songs/舊街角.mp3",
        duration: 197, // 3:17
    },
    {
        title: "好心分手",
        artist: "Candy Lo",
        imageUrl: "/cover-images/好心分手_CandyLo.jpeg",
        audioUrl: "/songs/好心分手.mp3",
        duration: 178, // 2:58
    },
    {
        title: "只要和你在一起",
        artist: "Shiga Lin",
        imageUrl: "/cover-images/只要和你在一起_ShigaLin.jpeg",
        audioUrl: "/songs/只要和你在一起.mp3",
        duration: 251, // 4:11
    },
];

const seedSongs = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);

        // Insert new songs
        await Song.insertMany(songs);

        console.log("Songs seeded successfully!");
    } catch (error) {
        console.error("Error seeding songs:", error);
    } finally {
        mongoose.connection.close();
    }
};

seedSongs();