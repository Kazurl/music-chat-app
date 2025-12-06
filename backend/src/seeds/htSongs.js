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
    {
                title: "Santa Baby",
                artist: "Laufey",
                imageUrl: "/cover-images/A_Very_Laufey_Holiday_Laufey.jpeg",
                audioUrl: "/songs/Santa_Baby.mp3",
                duration: 182, // 3:02
            },
            {
                title: "Santa Claus Is Comin' To Town",
                artist: "Laufey",
                imageUrl: "/cover-images/A_Very_Laufey_Holiday_Laufey.jpeg",
                audioUrl: "/songs/Santa_Claus_Is_Comin_To_Town.mp3",
                duration: 161, // 2:41
            },
            {
                title: "Chrismas Magic",
                artist: "Laufey",
                imageUrl: "/cover-images/A_Very_Laufey_Holiday_Laufey.jpeg",
                audioUrl: "/songs/Chrismas_Magic.mp3",
                duration: 186, // 3:06
            },
            {
                title: "Christmas Dreaming",
                artist: "Laufey",
                imageUrl: "/cover-images/A_Very_Laufey_Holiday_Laufey.jpeg",
                audioUrl: "/songs/Christmas_Dreaming.mp3",
                duration: 153, // 2:33
            },
            {
                title: "Winter Wonderland",
                artist: "Laufey",
                imageUrl: "/cover-images/A_Very_Laufey_Holiday_Laufey.jpeg",
                audioUrl: "/songs/Winter_Wonderland.mp3",
                duration: 132, // 2:12
            },
            {
                title: "From The Start",
                artist: "Laufey",
                imageUrl: "/cover-images/From_The_Start_Laufey.png",
                audioUrl: "/songs/From_The_Start.mp3",
                duration: 171, // 2:51
            },
            {
                title: "Falling Behind",
                artist: "Laufey",
                imageUrl: "/cover-images/Falling_Behind_Laufey.png",
                audioUrl: "/songs/Falling_Behind.mp3",
                duration: 171, // 2:51
            },
            {
                title: "Lover Girl",
                artist: "Laufey",
                imageUrl: "/cover-images/Lover_Girl_Laufey.png",
                audioUrl: "/songs/Lover_Girl.mp3",
                duration: 164, // 2:44
            },
            {
                title: "Let You Break My Heart Again",
                artist: "Laufey",
                imageUrl: "/cover-images/Let_You_Break_My_Heart_Again_Laufey.png",
                audioUrl: "/songs/Let_You_Break_My_Heart_Again.mp3",
                duration: 266, // 4:26
            }
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