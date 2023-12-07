import {getRating, getUsernames} from '../models/rating-model.mjs';

const getRatings = async (req, res) => {
    const result = await getRating();
    if (result) {
        res.status(200).json(result);
    } else {
        res.status(404).json({error: 'not found'});
    }
};

const getRatingUsernames = async (req, res) => {
    const {id} = req.params;
    const result = await getUsernames(id);
    if (result) {
        res.status(200).json(result);
    } else {
        res.status(404).json({error: 'not found'});
    }
}

export {getRatings, getRatingUsernames}