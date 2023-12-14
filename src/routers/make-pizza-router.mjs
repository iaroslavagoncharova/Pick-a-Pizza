import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pizzaRouter = express.Router();

pizzaRouter
/**
 * @api {get} /api/make-your-pizza Get pizza page
 * @apiVersion 1.0.0
 * @apiName getPizzaPage
 * @apiGroup Pizza
 * @apiPermission all
 * 
 * @apiSuccess {Page} pizza Pizza page.
 * 
 */
.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/pizza/pizza.html'));
});

export default pizzaRouter;