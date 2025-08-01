import { Router } from "express";

import { getAlbumById, getAllAlbums } from "../controllers/album.controller.js";

const router = Router();

router.get("/", getAllAlbums);  // todo: no protectRoute cause curr, we want to listen even logged out
router.get("/:id", getAlbumById);

export default router;