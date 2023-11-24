import express from 'express';
import path from 'path';

const joinPageRouter = express.Router();

joinPageRouter.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'membership-page', 'member.html'));
});

export default joinPageRouter;