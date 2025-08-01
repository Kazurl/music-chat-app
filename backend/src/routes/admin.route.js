import { Router } from "express";

import {
    checkAdmin,
    createSong,
    deleteSong,
    createAlbum,
    deleteAlbum,
} from "../controllers/admin.controller.js";
import {
    protectRoute,
    requireAdmin,
} from "../middleware/auth.middleware.js";

const router = Router();

router.use(protectRoute, requireAdmin);  // since every func here req admin access

router.get("/check", checkAdmin);  // check if a user has admin access

router.post("/songs", createSong);
router.delete("/songs/:id", deleteSong);

router.post("/albums", createAlbum);
router.delete("/album/:id", deleteAlbum);

export default router;