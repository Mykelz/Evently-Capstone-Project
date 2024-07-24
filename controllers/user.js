const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();


exports.registerUser = async (req, res, next) => {
    try{
        const { first_name, last_name, email, username, password } = req.body;

        const emailExst = await User.findOne({ email: email});
        if(emailExst){
            const error = new Error('User with the email already exits.')
            error.statusCode = 400;
            throw error
        }
        const hashedPw = await bcrypt.hash(password, 12);

        const user = await User.create({
            first_name: first_name,
            last_name: last_name,
            email: email,
            password: hashedPw
        })

        console.log(user, 'user details')
        res.status(201).json({
            message: 'user created',
            data: {
                id: user._id,
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email,

                updatedAt: user.updatedAt,
                createdAt: user.createdAt
            }
        })
    }catch(err){
        if (!err.statusCode){
            err.statusCode = 500;
        }
        next(err);

    }
}


exports.loginUser = async (req, res, next)=>{
    try{
        const { email, password } = req.body;

        const user = await User.findOne({email: email});
    
        if (!user){
            const error = new Error('No user is associated with this email');
            error.statusCode = 404;
            throw error;
        }
    
       const isEqual = await bcrypt.compare(password, user.password)

       if(!isEqual){
            const error = new Error('Wrong password')
            error.statusCode = 401;
            throw error;
       }
       const token = jwt.sign(
        { email: user.email, userId: user._id},
        process.env.JWT_SECRET,
        { expiresIn: '1hr'}
      );
      console.log(user.email, '--login successfull')

      res.status(200).json({
        message: 'Login Successfull',
        data: {
            accessToken: 'Bearer ' + token,
            user: {
                id: user._id,
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email,
                updatedAt: user.updatedAt,
                createdAt: user.createdAt
            }
            }
        })

    }catch(err){
        if (!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    }
}