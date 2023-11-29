import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import sendData from '../controllers/pizza-controller.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pizzaRouter = express.Router();

pizzaRouter.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/pizza/pizza.html'));
});

pizzaRouter.route('/').post(sendData);

export default pizzaRouter;