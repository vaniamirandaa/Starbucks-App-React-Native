const { verifyAccessToken } = require('../helpers/jwt')
const { User } = require('../models')

module.exports = async (req, res, next) => {
    try {
        const { access_token } = req.headers
        if(!access_token) { 
            return res.status(401).json({ name: "No Token Found"})
        }

        const payload = verifyAccessToken(access_token);

        console.log(payload);
        const data = await User.findByPk(payload.id)
        if(!data){
            return res.status(403).json({ message: "Unauthorized!" });

        }

        req.user = {
            id: data.id,
            username: data.username,
            email: data.email,
            role: data.role
        }
        next()

    } catch (err) {
        console.log(err);
        if (err.name === "JsonWebTokenError") {
            return res.status(401).json({ message: "Invalid token!" });
        }
        res.status(500).json({ error: 'Internal Server Error' });


    }
}