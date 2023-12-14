import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { getPizzas as getShoppingCart } from '../controllers/shopping-cart-controller.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const checkoutRouter = express.Router();

checkoutRouter
/**
 * @api {get} /api/checkout Get checkout page
 * @apiVersion 1.0.0
 * @apiName getCheckoutPage
 * @apiGroup Checkout
 * @apiPermission all
 * 
 * @apiSuccess {Page} checkout Checkout page.
 * 
 */
.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/checkout/checkout.html'));
});

checkoutRouter
.get('/:id', getShoppingCart);

export default checkoutRouter;