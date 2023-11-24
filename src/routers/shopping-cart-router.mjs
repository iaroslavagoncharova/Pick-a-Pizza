import express from 'express';
import path from 'path';

const cartRouter = express.Router();

cartRouter.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'shopping-cart', 'shopping-cart.html'));
});

export default cartRouter;