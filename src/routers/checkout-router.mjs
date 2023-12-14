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
/**
 * @api {get} /api/checkout/:id Get shopping cart
 * @apiVersion 1.0.0
 * @apiName getShoppingCart
 * @apiGroup Checkout
 * @apiPermission user
 * 
 * @apiParam {Number} id User ID.
 * 
 * @apiSuccess {Object[]} pizza List of pizza details of pizzas in shopping cart.
 * @apiSuccess {Number} pizza.pizza_id Pizza ID.
 * @apiSuccess {String} pizza.dough Pizza dough.
 * @apiSuccess {String} pizza.size Pizza size.
 * @apiSuccess {Number} pizza.price Pizza price.
 * @apiSuccess {Number} pizza.prompt_id Pizza prompt ID.
 * @apiSuccess {Number} pizza.quantity Pizza quantity.
 * @apiSuccess {String[]} pizza.ingredients Pizza ingredients.
 * @apiSuccess {String} pizza.ingredients.name Pizza ingredient name.
 * 
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 * {
 *  "pizza": [
 *  {
 *   "pizza_id": 1,
 *   "dough": "keto",
 *   "size": "S",
 *   "price": 10.00,
 *   "prompt_id": 1,
 *   "quantity": 2, 
 *   "ingredients": [
 *    {"name": "cheese"},
 *    {"name": "tomato"},
 *    {"name": "ham"}
 * ]
 * },
 * {
 *   "pizza_id": 2,
 *   "dough": "usual",
 *   "size": "L",
 *   "price": 12.00,
 *   "prompt_id": NULL,
 *   "quantity": 1,
 *   "ingredients": [
 *    {"name": "cheese"},
 *    {"name": "tomato"},
 *    {"name": "ham"},
 *    {"name": "mushrooms"}
 * ]
 * }
 * ]
 * }
 * 
 * @apiErrorExample Error-Response:
 * HTTP/1.1 404 Not Found
 * {
 *   "error": "not found"
 * }
 */
.get('/:id', getShoppingCart);

export default checkoutRouter;