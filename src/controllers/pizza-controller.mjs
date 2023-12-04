import {sendInfo, getCalories} from "../models/pizza-model.mjs";


const sendData = async (req, res) => {
    console.log('sendData', req.body);
    const result = await sendInfo(req.body);
    if (result) {
        res.status(201).json(result);
    } else {
        res.status(404).json({error: 'not found'});
    }
};

const fetchCalories = async (req, res) => {
    console.log('fetchCalories', req.query);
    const {id} = req.query;
    const result = await getCalories(id);
    if (result) {
        res.status(201).json(result);
    } else {
        res.status(404).json({error: 'not found'});
    }
}


export {sendData, fetchCalories};