import express from 'express';
import path from 'path';

const pizzaRouter = express.Router();

pizzaRouter.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'pizza', 'pizza.html'));
});

export default pizzaRouter;