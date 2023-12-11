import express from 'express';
import { listUsers, putUser, putPassword, deleteUser } from '../controllers/user-controller.mjs';

const userRouter = express.Router();

userRouter.route('/').get(listUsers)
userRouter.route('/update').put(putUser);
userRouter.route('/update/password').put(putPassword);
userRouter.route('/delete/:id').delete(deleteUser);

export default userRouter;
