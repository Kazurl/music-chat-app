import cookieParser from "cookie-parser";
import cors from "cors";
import cron from "node-cron";
import dotenv from "dotenv";
import express from "express";
import fileupload from "express-fileupload";
import fs from "fs";
import path from "path";
import { createServer } from "http";
import { clerkMiddleware } from "@clerk/express";

import { connectDB } from "./lib/db.js";
import { initializeSocket } from "./lib/socket.js";
import adminRoutes from "./routes/admin.route.js";
import albumRoutes from "./routes/album.route.js";
import authRoutes from "./routes/auth.route.js";
import songRoutes from "./routes/song.route.js";
import statRoutes from "./routes/stat.route.js";
import userRoutes from "./routes/user.route.js";
import { fileURLToPath } from "url";

dotenv.config();

const PORT = process.env.PORT || 5001;
const app = express();  // todo: utilise socket.io
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Socket.io Resolve
const server = createServer(app);
initializeSocket(server);

// Middlewares
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,  // allows cookies/ auth headers to be sent with req
}));
app.use(express.json());  // to parse req.body
app.use(cookieParser());
app.use(clerkMiddleware());  // this will add auth to req obj => req.auth.userId
app.use(fileupload({
    useTempFiles: true,
    tempFileDir: path.join(__dirname, "../tmp"),  // hold img uploads till uploaded to cloudinary
    createParentPath: true,
    limits: {
        fileSize: 10 * 1024 * 1024  // max size of 10MB per upload
    },
}));

// cron jobs (to handle deletion of tmp every set time interval)
const tempDir = path.join(__dirname, "../tmp");
cron.schedule("0 * * * *", () => {  // delete every hr
    if (fs.existsSync(tempDir)) {
        fs.readdir(tempDir, (err, files) => {
            if (err) {  // if err just return out of it
                console.log("error", err);
                return;
            }

            for (const file of files) {  // delete all files in tmp
                fs.unlink(path.join(tempDir, file), (err) => {});
            }
        });
    }
});

app.use("/api/admin", adminRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/songs", songRoutes);
app.use("/api/albums", albumRoutes);
app.use("/api/stats", statRoutes);

// If in production phase, then make the dist folder in frontend into static assets
// This allows the frontend to be joined with the backend under the same domain
// Meaning client and server both under same domain
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../../frontend/dist")));

    // If any routes aside from:
    // "/api/auth" and "/api/messages" visited, then go to react application via index.html
    app.get("*splat", (req, res) => {
        res.sendFile(path.join(__dirname, "../../frontend/dist/index.html"));
    });
}

// error handler middleware
app.use((err, req, res, next) => {
	const statusCode = err.statusCode || 500;
	const message = err.message || "Internal Server Error";
	res.status(statusCode).json({
		success: false,
		message: process.env.NODE_ENV === "production" ? "Internal Server Error" : message,
		stack: process.env.NODE_ENV === "production" ? "🥞" : err.stack,
	});
});

server.listen(PORT, () => {
    console.log("Server is running on port: ", PORT);
    connectDB();
});