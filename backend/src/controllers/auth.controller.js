// import bcrypt from "bcryptjs";
// import cloudinary from "cloudinary";
// import crypto from "crypto";

import { User } from "../models/user.model.js";
// import {
//     generateTokenandSendCookie,
// } from "../lib/utils.js";

// export const signup = async (req, res, next) => {
//     const { fullName, email, password } = req.body;
//     try {
//         if (!fullName || !email || !password) {
//             return res.status(400).json({ success: false, message: "All fields are required" });
//         }
//         if (password.length < 8) {
//             return res.status(400).json({ success: false, message: "Password must be at least 8 characters" });
//         }

//         const user = await User.findOne({email});
//         if (user) return res.status(400).json({ success: false, message: "Email already exists" });

//         const salt = await bcrypt.genSalt(10);
//         const hashedPassword = await bcrypt.hash(password, salt);
        
//         const newUser = new User({
//             fullName,
//             email,
//             password: hashedPassword
//         });

//         if (newUser) {
//             // generate jwt token here
//             generateTokenandSendCookie(newUser._id, res);
//             await newUser.save();

//             // todo: create mailtrap domain
//             //await sendVerificationEmail(newUser.email, verificationToken);

//             res.status(201).json({
//                 success: true,
//                 message: "User created successfully",
//                 user: {
//                     ...newUser._doc,
//                     password: undefined,
//                 },
//             });
//         } else {
//             res.status(400).json({ success: false, message: "Invalid user data"});
//         }
//     } catch (error) {
//         console.log("error in signup controller", error.message);
//         next(error);
//     }
// };

// export const login = async (req, res, next) => {
//     const { email, password } = req.body;
//     try {
//         // no need check validity of fields in backend since db just return false
//         const user = await User.findOne({email});

//         if (!user) return res.json({ success: false, message: "Invalid credentials" });

//         const isPasswordCorrect = await bcrypt.compare(password, user.password);  // User keyed in pw, hashed pw in db
//         if (!isPasswordCorrect) return res.json({ success: false, message: "Invalid credentials" });

//         generateTokenandSendCookie(user._id, res);
//         user.lastlogin = new Date();  // save lastlogin of user for each login instance
//         await user.save();

//         res.status(200).json({
//             success: true,
//             message: "Logged in successfully",
//             user: {
//                 ...user._doc,
//                 password: undefined,
//             },
//         });
//     } catch (error) {
//         console.log("error in login controller", error.message);
//         next(error);
//     }
// };

// export const logout = async (req, res, next) => {
//     try {
//         // remove cookie so no longer have valid session id
//         res.clearCookie("jwttoken");
//         //res.cookie("jwttoken", "", {maxAge:0})  // maxAge: 0 means expire immediately
//         res.status(200).json({ success: true, message: "Logged out successfully" });
//     } catch (error) {
//         console.log("error in logout controller", error.message);
//         next(error);
//     }
// };

// export const updateProfile = async (req, res, next) => {
//     try {
//         const { profilePic } = req.body;  // profilePic should be a base64 str

//         // Since user added to req in protectRoute, we can access directly w/o input as checkAuth called ea refresh
//         const userId = req.user._id;

//         if (!profilePic) {
//             return res.status(400).json({ message: "Profile pic is required" });
//         }

//         const uploadResponse = await cloudinary.uploader.upload(
//             profilePic,
//             { resouce_type: "auto" }
//         );  // Upload using cloudinary and it will give us a url str
//         console.log(uploadResponse.secure_url);

//         const updatedUser = await User.findByIdAndUpdate(
//             userId,  // id to find
//             { profilePic: uploadResponse.secure_url},  // obj containing fields to be updated: new value
//             { new: true }  //  if set to true, returns modified doc instead of original
//         );  // Update db at same time

//         res.status(200).json({ updatedUser });  // new: true sets updatedUser as the updated user obj
//     } catch (error) {
//         console.log("error in update profile: ", error);
//         next(error);
//     }
// };

// export const checkAuth = (req, res, next) => {
//     try {
//         const user = req.user;  // sent from protectRoute

//         // todo: add verification checking
//         /*
//         if (!user.isVerified) {
//             return res.status(401).json({ success: false, message: "Unauthorized - User not verified" });
//         }
//         */

//         res.status(200).json({ success: true, user });
//         console.log("checkAuth successfully");
//     } catch (error) {
//         console.log("error in checkAuth controller", error.message);
//         next(error);
//     }
// };

export const callback = async (req, res, next) => {
    try {
        const { id, firstName, lastName, imageUrl } = req.body;  // info sent by clerk
        // check if user exists
        const user = await User.findOne({ clerkId: id });

        if (!user) {
            // means can sign up
            await User.create({
                clerkId: id,
                fullName: `${firstName || ""} ${lastName || ""}`.trim(),
                imageUrl,
            });
        }

        res.status(200).json({ success: true, message: "Successful callback" });
    } catch (error) {
        console.log("error in callback controller", error.message);
        next(error);
    }
};