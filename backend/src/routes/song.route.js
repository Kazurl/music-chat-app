import { Router } from "express";

import {
    getAllSongs,
    getFeaturedSongs,
    getPersonalisedSongs,
    getTrendingSongs,
} from "../controllers/song.controller.js";
import {
    protectRoute,
    requireAdmin,
} from "../middleware/auth.middleware.js";

const router = Router();

router.get("/", protectRoute, requireAdmin, getAllSongs);
router.get("/featured", getFeaturedSongs);
router.get("/personalised-songs", getPersonalisedSongs);
router.get("/trending", getTrendingSongs);

// todo: search song by name so we can fetch using search bar

export default router;