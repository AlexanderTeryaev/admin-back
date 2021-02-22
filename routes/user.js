require('dotenv').config()
const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken');
const UserController = require('../controllers/userController');

const accessTokenSecret = process.env.accessTokenSecret;

const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
      const token = authHeader.split(' ')[1];

      jwt.verify(token, accessTokenSecret, (err, user) => {
          if (err) {
              return res.sendStatus(403);
          }

          req.user = user;
          next();
      });
  } else {
      res.sendStatus(401);
  }
};

router.post('/authenticate', UserController.authenticate);
router.post('/register', UserController.register);
router.get('/', authenticateJWT, UserController.getAllUsers);
router.get('/:id', authenticateJWT, UserController.getUser);

module.exports = router 