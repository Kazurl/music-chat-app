import { Album } from "../models/album.model.js";

export const getAllAlbums = async (req, res, next) => {
    try {
        const albums = await Album.find();
        res.status(200).json(albums);
    } catch (error) {
        console.log("error in getAllAlbums controller", error.message);
        next(error);
    }
};

export const getAlbumById = async (req, res, next) => {
    try {
        const { id: albumId } = req.params;  // get id form params and rename to albumId

        // populate will go to this albumId and populate the result with each song object and not just its song id as stored in album's song ref
        const album = await Album.findById(albumId).populate("songs");

        if (!album) {
            return res.status(404).json({ success: false, message: "Album not found" });
        }

        res.status(200).json(album);
    } catch (error) {
        console.log("error in getAlbumById controller", error.message);
        next(error);
    }
};