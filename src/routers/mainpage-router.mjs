import express from 'express';
import path from 'path';

const mainRouter = express.Router();

mainRouter.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'mainpage', 'mainpage.html'));
});

export default mainRouter;