import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const accRouter = express.Router();

accRouter.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/profile/profile.html'));
})

accRouter.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/admin-profile/admin-profile.html'));
});

export default accRouter;