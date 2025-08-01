import { Song } from "../models/song.model.js";

export const getAllSongs = async (req, res, next) => {
    try {
        // (-1) retrieve by descending order => newest -> oldest
        // (1) retrieve by ascending order => oldest -> newest
        const songs = await Song.find().sort({ createdAt: -1 });

        res.status(200).json(songs);
    } catch (error) {
        console.log("error in getAllSongs controller", error.message);
        next(error);
    }
};

// todo: some AI to do some recommendation
export const getFeaturedSongs = async (req, res, next) => {
    try {
        // fetch 6 (i.e 2by3) random songs using mongodb's aggregation pipeline
        const songs = await Song.aggregate([
            {
                $sample: {size: 6},
            },
            {
                // These are the fields we want to fetch from these aggregated data
                $project: {
                    _id: 1,
                    title: 1,
                    artist: 1,
                    imageUrl: 1,
                    audioUrl: 1,  // needed so we can immediately play the song when clicked
                },
            },
        ]);

        res.status(200).json(songs);
    } catch (error) {
        console.log("error in getFeaturedSongs controller", error.message);
        next(error);
    }
};

// todo: some AI to do some recommendation
export const getPersonalisedSongs = async (req, res, next) => {
    try {
        // fetch 4 (i.e row of 4) random songs using mongodb's aggregation pipeline
        const songs = await Song.aggregate([
            {
                $sample: {size: 4}
            },
            {
                // These are the fields we want to fetch from these aggregated data
                $project: {
                    _id: 1,
                    title: 1,
                    artist: 1,
                    imageUrl: 1,
                    audioUrl: 1,  // needed so we can immediately play the song when clicked
                },
            },
        ]);

        res.status(200).json(songs);
    } catch (error) {
        console.log("error in getPersonalisedSongs controller", error.message);
        next(error);
    }
};

// todo: some ML to do some recommendation
export const getTrendingSongs = async (req, res, next) => {
    try {
        // fetch 4 (i.e row of 4) random songs using mongodb's aggregation pipeline
        const songs = await Song.aggregate([
            {
                $sample: {size: 4}
            },
            {
                // These are the fields we want to fetch from these aggregated data
                $project: {
                    _id: 1,
                    title: 1,
                    artist: 1,
                    imageUrl: 1,
                    audioUrl: 1,  // needed so we can immediately play the song when clicked
                },
            },
        ]);

        res.status(200).json(songs);
    } catch (error) {
        console.log("error in getTrendingSongs controller", error.message);
        next(error);
    }
};

// todo: search song by name so we can fetch using search bar
export const getSongById = async (req, res, next) => {
    try {
        const { id: songId } = req.params;  // get id from params and rename to songId
        const song = await Song.findById(songId);

        res.status(200).json(song);
    } catch (error) {
        console.log("error in getSongById", error.message);
        next(error);
    }
};