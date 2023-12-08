import {getRating, getUsernames, postRating} from '../models/rating-model.mjs';

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
    console.log(id);
    const result = await getUsernames(id);
    if (result) {
        res.status(200).json(result);
    } else {
        res.status(404).json({error: 'not found'});
    }
};

const postRatings = async (req, res) => {
    const {stars, review_header, review_text, user_id} = req.body;
    const result = await postRating(stars, review_header, review_text, user_id);
    if (result) {
        res.status(201).json(result);
    } else {
        res.status(404).json({error: 'not found'});
    }

}

export {getRatings, getRatingUsernames, postRatings}