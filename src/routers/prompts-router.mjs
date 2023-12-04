import express from 'express';
import { getPromptNames } from '../controllers/mainpage-controller.mjs';

const promptRouter = express.Router();

promptRouter.get('/', async (req, res) => {
    try {
        const names = await getPromptNames();
        res.json(names);
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default promptRouter;
