import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const mapPageRouter = express.Router();

mapPageRouter.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/map/map.html'));
});

export default mapPageRouter;