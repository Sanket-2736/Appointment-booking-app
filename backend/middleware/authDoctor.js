require('dotenv').config();
const jwt = require('jsonwebtoken')

const authDoctor = async (req, res, next) => {
    try {        
        const {dtoken} = req.headers;
        if(!dtoken){
            return res.json({
                success: false,
                message: "Unauthorised login!"
            });
        }

        const token_decoded = jwt.verify(dtoken, process.env.JWT_SECRET);
        req.body.docId = token_decoded.id;
        next();
    } catch (error) {
        console.error("Error in doctor middleware: ", error);
        return res.json({
            success: false,
            message: "Unauthorised login!"
        })
    }
}

module.exports = authDoctor;