import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { getPromptNames } from '../controllers/mainpage-controller.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const mainRouter = express.Router();

mainRouter.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/mainpage/mainpage.html'))
});

mainRouter.get('/prompts', async (req, res) => {
    try {
        const names = await getPromptNames();
        res.json(names);
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default mainRouter;