import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const joinPageRouter = express.Router();

joinPageRouter.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/membership-page/member.html'));
});

export default joinPageRouter;