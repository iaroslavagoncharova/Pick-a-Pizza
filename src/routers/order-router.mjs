import express from 'express';
import { getOrderHistoryOfUser, getOrdersInProgress } from '../controllers/orders-controller.mjs';

const orderRouter = express.Router();

orderRouter.route('/:id').get(getOrderHistoryOfUser);
orderRouter.route('/wip/auth/:id').get(getOrdersInProgress);

export default orderRouter;