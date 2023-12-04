import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import getPromptNames from '../controllers/mainpage-controller.mjs';
import { get } from 'http';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const mainRouter = express.Router();

mainRouter.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/mainpage/mainpage.html'));
});

export default mainRouter;