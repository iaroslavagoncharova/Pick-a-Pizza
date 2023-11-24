import express from 'express';
import path from 'path';

const jobApplicationRouter = express.Router();

jobApplicationRouter.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'work', 'work.html'));
});

export default jobApplicationRouter;