import jwt from 'jsonwebtoken';
import 'dotenv/config';
import loginUser from "../models/user-model.mjs";

const postLogin = async (req, res, next) => {
    console.log('postLogin', req.body);
    const user = await loginUser(req.body);

    if (!user) {
        const error = new Error('invalid username/password');
        error.status = 401;
        return next(error);
    }

    if (user.error) {
        const error = new Error(user.error);
        error.status = 401;
        return next(error);
    }

    console.log('postLogin', user);
    try {
        const token = jwt.sign(user, process.env.JWT_SECRET);
        delete user.password;
        res.json({message: 'logged in', token: token, user: user});
    } catch (e) {
        res.status(401).json({message: 'invalid username/password'});
    }
};

const getMe = async (req, res) => {
    console.log('getMe', req.user);
    if (req.user) {
      res.json({message: 'token ok', user: req.user});
    } else {
      res.sendStatus(401);
    }
};

export {postLogin, getMe};