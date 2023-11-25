import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const cartRouter = express.Router();

cartRouter.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/shopping-cart/shopping-cart.html'));
});

export default cartRouter;