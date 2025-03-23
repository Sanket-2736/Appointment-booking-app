const jwt = require('jsonwebtoken')

const authADmin = async (req, res, next) => {
    try {
        const {atoken} = req.headers;
        console.log(atoken)
        if(!atoken){
            console.log("Token not found!");
            return res.json({
                success: false,
                message : "Unauthorised login!"
            });
        }

        const token_decode = jwt.verify(atoken, process.env.JWT_SECRET);

        if(token_decode != process.env.ADMIN_EMAIL+process.env.ADMIN_PASSWORD){
            console.log("Invalid token");
            return res.json({
                success: false,
                message : "Unauthorised login!"
            });
        }

        next();
    } catch (error) {
        return res.json({
            message: 'Invalid token',
            error: error.message,
            success : false
        })
    }
}

module.exports = authADmin