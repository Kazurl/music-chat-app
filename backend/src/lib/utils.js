import jwt from "jsonwebtoken";

export const generateTokenandSendCookie = (userId, res) => {
    // generate token
    const token = jwt.sign({userId}, process.env.JWT_SECRET, {
        expiresIn: "7d"
    });

    // send token in "httpOnly" cookie form to user
    res.cookie("jwttoken", token, {  // appear as jwttoken in the browser cookie
        maxAge: 7 * 24 * 60 * 60 * 1000,  // expiry in terms of ms
        httpOnly: true,  // prevent XSS attacks
        sameSite: "strict",  // prevent CSRF (cross-site request forgery)
        secure: process.env.NODE_ENV !== "development"
    });

    return token;
};

// todo: verification code generator
/*
export const generateVerificationCode = () => {

}; 
*/