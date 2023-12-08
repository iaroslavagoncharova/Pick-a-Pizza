import express from 'express';
import { getOrderHistoryOfUser } from '../controllers/user-controller.mjs';

const orderRouter = express.Router();

orderRouter.route('/:id').get(getOrderHistoryOfUser);

export default orderRouter;