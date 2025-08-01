import { clerkClient } from "@clerk/express";

// just checking if user is authenticated
export const protectRoute = async (req, res, next) => {
    try {
        // const token = req.cookies.jwttoken  // helps parse cookie (jwttoken since we called it that in generateTokenandSendCookie's res.cookie)

        // if (!token) {
        //     return res.status(401).json({ success: false, message: "Unauthorized - No Token Provided" });
        // }

        // const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // if (!decoded) {
        //     return res.status(401).json({ success: false, message: "Unauthorized - Invalid Token" });
        // }

        // const user = await User.findById(decoded.userId).select("-password");  // Send user from db w/o pw

        // if (!user) return res.status(404).json({ success: false, message: "User not found" });
        // req.user = user;
        if (!req.auth.userId) {
            return res.status(401).json({ success: false, message: "Unauthorized - User not logged in" });
        }

        next();  // next: gets the next function
    } catch (error) {
        console.log("Error in protectRoute middleware: ", error.message);
        next(error);
    }
};

// checks whether admin perm req
export const requireAdmin = async (req, res, next) => {
    try {
        const currentUser = await clerkClient.users.getUser(req.auth.userId);
        const isAdmin = process.env.ADMIN_EMAIL === currentUser.primaryEmailAddress?.emailAddress;

        if (!isAdmin) {
            return res.status(403).json({ success: false, message: "Unauthorized - User is not admin" });
        }

        next();
    } catch (error) {
        console.log("Error in requireAdmin middleware: ", error.message);
        next(error);
    }
};