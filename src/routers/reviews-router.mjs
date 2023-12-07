import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { getRatingUsernames, getRatings } from '../controllers/rating-controller.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ratingRouter = express.Router();

ratingRouter.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/ratings/ratings.html'))
});
ratingRouter.route('/ratings').get(getRatings);

ratingRouter.route('/:id').get(getRatingUsernames);

export default ratingRouter;