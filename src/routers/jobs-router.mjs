import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const jobApplicationRouter = express.Router();

jobApplicationRouter.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/work/work.html'));
});

export default jobApplicationRouter;