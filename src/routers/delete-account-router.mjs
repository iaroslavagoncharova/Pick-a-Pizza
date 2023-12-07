import express from 'express';
import path from 'path';
import { deleteUser } from '../controllers/user-controller.mjs';

const deleteRouter = express.Router();

deleteRouter.route('/:id').delete(deleteUser);

export default deleteRouter;
