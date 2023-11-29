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
        res.json({message: 'logged in', token: token, user: user});
    } catch (e) {
        res.status(401).json({message: 'invalid username/password'});
    }
};

const getMe = (req, res) => {
    console.log('getMe user', req.user);
    res.json(req.user);
};

export {postLogin, getMe};