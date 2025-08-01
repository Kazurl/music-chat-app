import cloudinary from "../lib/cloudinary.js";

import { Song } from "../models/song.model.js";
import { Album } from "../models/album.model.js";

// helper func for cloudinary uploads
const uploadToCloudinary = async (file) => {
    console.log(file)  // todo: remove when done
    try {
        console.log("Cloudinary config", cloudinary.config());  // todo: remove when done
        const result = await cloudinary.uploader.upload(file.tempFilePath, {
            resource_type: "auto",  // let it figure out what file type it is
        });

        return result.secure_url;
    } catch (error) {
        console.log("error in uploadToCloudinary controller", error);
        throw new Error("Error uploading to cloudinary");
    }
};

// provide some auth response to client on admin status of user
export const checkAdmin = async (req, res, next) => {
    try {
        res.status(200).json({ admin: true });
    } catch (error) {
        console.log("error in checkAdmin controller", error.message);
        next(error);
    }
};

export const createSong = async (req, res, next) => {
    try {
        // if user has img file and audio file
        if (!req.files || !req.files.audioFile || !req.files.imageFile) {
            return res.status(400).json({ success: false, message: "Please upload all files" });
        }

        const { title, artist, albumId, duration } = req.body;
        const audioFile = req.files.audioFile;
        const imageFile = req.files.imageFile;

        console.log("req.files:", req.files);  // todo: remove when done
        console.log("audioFile path:", req.files.audioFile.tempFilePath);  // todo: remove when done
        console.log("imageFile path:", req.files.imageFile.tempFilePath);  // todo: remove when done


        const audioUrl = await uploadToCloudinary(audioFile);
        const imageUrl = await uploadToCloudinary(imageFile);

        const song = new Song({
            title,
            artist,
            audioUrl,
            imageUrl,
            duration,
            albumId: albumId || null
        });

        await song.save();

        // if song part of album, update album's songs arr
        if (albumId) {
            await Album.findByIdAndUpdate(albumId, {
                $push: { songs: song._id },
            });
        }

        res.status(201).json(song);
    } catch (error) {
        console.log("error in createSong controller", error.message);
        next(error);
    }
};

export const deleteSong = async (req, res, next) => {
    try {
        const { id } = req.params;  // id since address bar we specified ':id' under routes

        const song = await Song.findById(id);

        // if song belongs to an album, update the album's songs arr
        if (song.albumId) {
            await Album.findByIdAndDelete(song.albumId, {
                $pull: { song: song._id },
            });
        }

        await Song.findByIdAndDelete(id);

        res.status(200).json({ success:true, message: "Song deleted successfully" });
    } catch (error) {
        console.log("error in deleteSong controller", error.message);
        next(error);
    }
};

export const createAlbum = async (req, res, next) => {
    try {
        const { title, artist, releaseYear } = req.body;
        const imageFile = req.files;

        const { imageUrl } = await uploadToCloudinary(imageFile);

        const album = new Album({
            title,  // since the var we use here equal to names used in model, no need doub work
            artist,
            imageUrl,
            releaseYear,
        });

        await album.save();

        res.status(200).json(album);
    } catch (error) {
        console.log("error in createAlbum controller", error.message);
        next(error);
    }
};

export const deleteAlbum = async (req, res, next) => {
    try {
        const { id } = req.params;  // id since address bar we specified ':id' under routes

        await Song.deleteMany({ albumId: id });
        await Album.findByIdAndDelete(id);

        res.status(200).json({ success:true, message: "Album deleted successfully" });
    } catch (error) {
        console.log("error in deleteAlbum controller", error.message);
        next(error);
    }
};