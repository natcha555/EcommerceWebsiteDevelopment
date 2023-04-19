import jwt from "jsonwebtoken";

//สร้าง Access token 
export const createAccessToken = (payload) => {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {expiresIn: "15m"})//jwt.sign(payload, secretOrPrivateKey, [options, callback])
}
//สร้าง Refresh token 
export const createRefreshToken = (payload) => {
    return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {expiresIn: "7d"})
}

