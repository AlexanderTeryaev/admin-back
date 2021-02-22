require('dotenv').config()
const db = require("../models");
const User = db.users;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const accessTokenSecret = process.env.accessTokenSecret;

const userController = {
    authenticate: async (req, res) => {
        try {
            const { username, password } = req.body;

            const user = await User.findOne({where: { username: username }});

            if (!user) {
                return res.status(400).json({message: 'User Not Found'});
            }

            if (bcrypt.compareSync(password, user.password)) {
                // Passwords match
                const accessToken = jwt.sign({_id: user._id}, accessTokenSecret);
        
                res.status(200).json({
                    token: accessToken,
                    user
                });
            } else {
                // Passwords don't match
                
                res.status(400).json({message: 'Username or password incorrect'});
            }
        } catch (err) {
            console.log(err);
            res.status(400).json({ message: err.message })
        }
    },

    register: async (req, res) => {
        try {
            const { first_name, last_name, username, password } = req.body;

            if (!req.body.first_name) {
                return res.status(400).json({message: 'First name is required'});
            }

            if (!req.body.last_name) {
                return res.status(400).json({message: 'Last name is required'});
            }
            
            if (!req.body.username) {
                return res.status(400).json({message: 'User name is required'});
            }

            if (!req.body.password) {
                return res.status(400).json({message: 'Password is required'});
            }

            const user = await User.findOne({where: { username: username }});
            if (user) {
                return res.status(400).json({message: 'User Aleady Exist'});
            }

            let newUser = new User();

            newUser.first_name = first_name;
            newUser.last_name = last_name;
            newUser.username = username;
            newUser.password = bcrypt.hashSync(password, 10);

            await newUser.save();

            const accessToken = jwt.sign({_id: newUser._id}, accessTokenSecret);
        
            res.status(200).json({
                token: accessToken,
                user: newUser
            });
            
        } catch (err) {
            console.log(err);
            res.status(400).json({ message: err.message })
        }
    },

    getAllUsers: async (req, res) => {
        try {
            const users = await User.findAll();
            
            res.status(201).json(users)
        } catch (err) {
            res.status(400).json({ message: err.message })
        }
    },

    getUser: async (req, res) => {
        try {
            let id = req.params.id;
            const user = await User.findOne({id: id});
            
            res.status(201).json(user)
        } catch (err) {
            res.status(400).json({ message: err.message })
        }
    }
}

module.exports = userController;