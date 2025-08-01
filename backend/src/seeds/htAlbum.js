import mongoose from "mongoose";
import { Song } from "../models/song.model.js";
import { Album } from "../models/album.model.js";
import { config } from "dotenv";

config();

const seedDatabase = async () => {
    try {
        const MONGODB_URI="mongodb+srv://bczhntu:owXnLZHn30H2xNC2@cluster0.lx6xebg.mongodb.net/music_chat_db?retryWrites=true&w=majority&appName=Cluster0"
        await mongoose.connect(MONGODB_URI);

        // Clear existing data
        await Album.deleteMany({});
        await Song.deleteMany({});

        // First, create all songs
        const createdSongs = await Song.insertMany([
            {
                title: "City Rain",
                artist: "Urban Echo",
                imageUrl: "/cover-images/7.jpg",
                audioUrl: "/songs/7.mp3",
                plays: Math.floor(Math.random() * 5000),
                duration: 39, // 0:39
            },
            {
                title: "Neon Lights",
                artist: "Night Runners",
                imageUrl: "/cover-images/5.jpg",
                audioUrl: "/songs/5.mp3",
                plays: Math.floor(Math.random() * 5000),
                duration: 36, // 0:36
            },
            {
                title: "Urban Jungle",
                artist: "City Lights",
                imageUrl: "/cover-images/15.jpg",
                audioUrl: "/songs/15.mp3",
                plays: Math.floor(Math.random() * 5000),
                duration: 36, // 0:36
            },
            {
                title: "Neon Dreams",
                artist: "Cyber Pulse",
                imageUrl: "/cover-images/13.jpg",
                audioUrl: "/songs/13.mp3",
                plays: Math.floor(Math.random() * 5000),
                duration: 39, // 0:39
            },
            {
                title: "Summer Daze",
                artist: "Coastal Kids",
                imageUrl: "/cover-images/4.jpg",
                audioUrl: "/songs/4.mp3",
                plays: Math.floor(Math.random() * 5000),
                duration: 24, // 0:24
            },
            {
                title: "Ocean Waves",
                artist: "Coastal Drift",
                imageUrl: "/cover-images/9.jpg",
                audioUrl: "/songs/9.mp3",
                plays: Math.floor(Math.random() * 5000),
                duration: 28, // 0:28
            },
            {
                title: "Crystal Rain",
                artist: "Echo Valley",
                imageUrl: "/cover-images/16.jpg",
                audioUrl: "/songs/16.mp3",
                plays: Math.floor(Math.random() * 5000),
                duration: 39, // 0:39
            },
            {
                title: "Starlight",
                artist: "Luna Bay",
                imageUrl: "/cover-images/10.jpg",
                audioUrl: "/songs/10.mp3",
                plays: Math.floor(Math.random() * 5000),
                duration: 30, // 0:30
            },
            {
                title: "Stay With Me",
                artist: "Sarah Mitchell",
                imageUrl: "/cover-images/1.jpg",
                audioUrl: "/songs/1.mp3",
                plays: Math.floor(Math.random() * 5000),
                duration: 46, // 0:46
            },
            {
                title: "Midnight Drive",
                artist: "The Wanderers",
                imageUrl: "/cover-images/2.jpg",
                audioUrl: "/songs/2.mp3",
                plays: Math.floor(Math.random() * 5000),
                duration: 41, // 0:41
            },
            {
                title: "Moonlight Dance",
                artist: "Silver Shadows",
                imageUrl: "/cover-images/14.jpg",
                audioUrl: "/songs/14.mp3",
                plays: Math.floor(Math.random() * 5000),
                duration: 27, // 0:27
            },
            {
                title: "Lost in Tokyo",
                artist: "Electric Dreams",
                imageUrl: "/cover-images/3.jpg",
                audioUrl: "/songs/3.mp3",
                plays: Math.floor(Math.random() * 5000),
                duration: 24, // 0:24
            },
            {
                title: "Neon Tokyo",
                artist: "Future Pulse",
                imageUrl: "/cover-images/17.jpg",
                audioUrl: "/songs/17.mp3",
                plays: Math.floor(Math.random() * 5000),
                duration: 39, // 0:39
            },
            {
                title: "Purple Sunset",
                artist: "Dream Valley",
                imageUrl: "/cover-images/12.jpg",
                audioUrl: "/songs/12.mp3",
                plays: Math.floor(Math.random() * 5000),
                duration: 17, // 0:17
            },
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
        ]);

        // Create albums with references to song IDs
        const albums = [
            {
                title: "Urban Nights",
                artist: "Various Artists",
                imageUrl: "/albums/1.jpg",
                releaseYear: 2024,
                songs: createdSongs.slice(0, 4).map((song) => song._id),
            },
            {
                title: "Coastal Dreaming",
                artist: "Various Artists",
                imageUrl: "/albums/2.jpg",
                releaseYear: 2024,
                songs: createdSongs.slice(4, 8).map((song) => song._id),
            },
            {
                title: "Midnight Sessions",
                artist: "Various Artists",
                imageUrl: "/albums/3.jpg",
                releaseYear: 2024,
                songs: createdSongs.slice(8, 11).map((song) => song._id),
            },
            {
                title: "Eastern Dreams",
                artist: "Various Artists",
                imageUrl: "/albums/4.jpg",
                releaseYear: 2024,
                songs: createdSongs.slice(11, 14).map((song) => song._id),
            },
            {
                title: "心淡",
                artist: "Various Artists",
                imageUrl: "/albums/5.jpeg",
                releaseYear: 2025,
                songs: createdSongs.slice(14, 20).map((song) => song._id),
            },
        ];

        // Insert all albums
        const createdAlbums = await Album.insertMany(albums);

        // Update songs with their album references
        for (let i = 0; i < createdAlbums.length; i++) {
            const album = createdAlbums[i];
            const albumSongs = albums[i].songs;

            await Song.updateMany({ _id: { $in: albumSongs } }, { albumId: album._id });
        }

        console.log("Database seeded successfully!");
    } catch (error) {
        console.error("Error seeding database:", error);
    } finally {
        mongoose.connection.close();
    }
};

seedDatabase();