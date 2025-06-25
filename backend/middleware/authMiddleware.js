const jwt = require('jsonwebtoken')


const protect=(req,res, next)=>{
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({message: 'not authorized, no token'})
        }
        const token = authHeader.split(' ')[1];

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = {userId: decoded.userId}

        next()

    } catch(error) {
        return res.status(401).json({message: 'not authorized, no token'})
    }
}

module.exports = {protect}