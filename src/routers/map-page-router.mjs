import express from 'express';
import path from 'path';

const mapPageRouter = express.Router();

mapPageRouter.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'map', 'map.html'));
});

export default mapPageRouter;