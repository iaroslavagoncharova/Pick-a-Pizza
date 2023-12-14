import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { removePizza, changeQuantity, createCart } from '../controllers/shopping-cart-controller.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const cartRouter = express.Router();

cartRouter
/**
 * @api {get} /api/shopping-cart Get shopping cart page
 * @apiVersion 1.0.0
 * @apiName getCart
 * @apiGroup Shopping Cart
 * @apiPermission all
 * 
 * @apiSuccess {Page} shopping-cart Shopping cart page.
 */
.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/shopping-cart/shopping-cart.html'));
});

cartRouter.route('/')
/**
 * @api {post} /api/shopping-cart Create a new cart
 * @apiVersion 1.0.0
 * @apiName postCart
 * @apiGroup Shopping Cart
 * @apiPermission user (self)
 * 
 * @apiParam {String} price Price.
 * @apiParam {String} user.user_id User ID.
 * @apiParam {String} pizzaIds Pizza IDs.
 * @apiParam {Number} quantity Quantity.
 * 
 * @apiSuccess {Object} ResultSetHeader Result set header
 * 
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 201 Created
 * {
 *  ResultSetHeader: {
 *    fieldCount: 0,
 *    affectedRows: 1,
 *    insertId: 1,
 *    info: '',
 *    serverStatus: 2,
 *    warningStatus: 0
 *    changedRows: 0
 * }
  }
 * @apiErrorExample Error-Response:
    *   HTTP/1.1 404 Not Found
    * {
    *  "error": "not found"
    * }
 * 
 */
  .post(createCart);

cartRouter.route('/:id')
/**
 * @api {put} /api/shopping-cart/:id Change quantity
 * @apiVersion 1.0.0
 * @apiName putQuantity
 * @apiGroup Shopping Cart
 * @apiPermission user (self)
 * 
 * @apiParam {String} pizza_id Pizza ID.
 * @apiParam {Number} quantity Quantity.
 * 
 * @apiSuccess {Object} ResultSetHeader Result set header
 * 
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 * {
 * ResultSetHeader {
 * fieldCount: 0,
 * affectedRows: 1,
 * insertId: 0,
 * info: 'Rows matched: 1  Changed: 1  Warnings: 0',
 * serverStatus: 2,
 * warningStatus: 0,
 * changedRows: 1
}
  }
 * @apiErrorExample Error-Response:
    *   HTTP/1.1 404 Not Found
    * {
    *  "error": "not found"
    * }
 * 
 */
  .put(changeQuantity)
/**
* @api {delete} /api/shopping-cart/:id Delete pizza from cart
* @apiVersion 1.0.0
* @apiName deletePizza
* @apiGroup Shopping Cart
* @apiPermission user (self)
*
* @apiSuccess {Message} message Deleted successfully.
*
* @apiSuccessExample Success-Response:
* HTTP/1.1 204 No Content
* {
* "message": "deleted"
* }
* @apiErrorExample Error-Response:
*   HTTP/1.1 404 Not Found
* {
* "error": "not found"
* }
*/
  .delete(removePizza);

export default cartRouter;