import { Album } from "../models/album.model.js";
import { Song } from "../models/song.model.js";
import { User } from "../models/user.model.js";

export const getStats = async (req, res, next) => {
    try {
        // promise.all (basically means runs alll the countDocuments concurrently)
        const [ totalSongs, totalAlbums, totalUsers, uniqueArtists ] = await Promise.all([
            Song.countDocuments(),
            Album.countDocuments(),
            User.countDocuments(),

            Song.aggregate([
                {
                    $unionWith: {
                        coll: "albums",  // combine all songs with all albums associated
                        pipeline: [],  // needed so it gives us the data we actl have
                    },
                },
                {
                    $group: {
                        _id: "$artist",
                    },
                },
                {
                    $count: "count",
                },
            ]),
        ]);

        res.status(200).json({ success: true,
                                totalAlbums,
                                totalSongs,
                                totalUsers,
                                totalArtists: uniqueArtists[0]?.count || 0  // incase undefined, return 0
        });
    } catch (error) {
        console.log("error in getStats controller", error.message);
        next(error);
    }
};