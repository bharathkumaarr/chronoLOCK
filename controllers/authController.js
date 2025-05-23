const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/User')


const signup = async(req,res)=>{
    try {
        const { email, password } = req.body;

        const existingUser = await User.findOne({email})
        if (existingUser) {
            return res.status(400).json({message: "user already exists"});
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser = await User.create({
            email, 
            password: hashedPassword
        })

        const token = jwt.sign(
            {userId: newUser._id},
            process.env.JWT_SECRET,
            {expiresIn: '1h'}
        )

        return res.status(201).json(
            {
                message: 'user created',
                token
            }
        )

    } 
    catch (error) {
        return res.status(500).json({message: 'server error'})
    }
}

module.exports= { signup }