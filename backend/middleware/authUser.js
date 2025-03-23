require('dotenv').config();
const jwt = require('jsonwebtoken')

const authUser = async (req, res, next) => {
    try {        
        const {token} = req.headers;
        if(!token){
            console.log("Token not found!");
            return res.json({
                success: false,
                message: "Unauthorised login!"
            });
        }

        const token_decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.body.userId = token_decoded.id;
        next();
    } catch (error) {
        console.log("Error in user middleware: ", error);
        return res.json({
            success: false,
            message: "Unauthorised login!"
        })
    }
}

module.exports = authUser;