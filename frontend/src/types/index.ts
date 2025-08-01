// to have the fields for each db model

export interface Song {
    _id: string;
    title: string;
    artist: string;
    imageUrl: string;
    audioUrl: string;
    duration: number;
    albumId: string | null;
    createdAt: string;
    updatedAt: string;   
}

export interface Album {
    _id: string;
    title: string;
    artist: string;
    imageUrl: string;
    releaseYear: number;
    songs: Song[];
}

export interface User {
    _id: string;
    fullName: string;
    imageUrl: string;
    clerkId: string;
}

export interface Message {
    _id: string;
    senderId: string;
    recevierId: string;
    content: string;
    image: string;
    createdAt: string;
    updatedAt: string;
}

export interface Stats {
    totalSongs: number;
    totalAlbums: number;
    totalUsers: number;
    totalArtists: number;
}