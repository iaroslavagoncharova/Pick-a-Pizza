import {sendInfo, getCalories, getSet, getDoughInfo, getAllIngredients} from "../models/pizza-model.mjs";


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
};

const getSets = async (req, res) => {
    console.log('getSets', req.params);
    const {id} = req.params;
    const result = await getSet(id);
    if (result) {
        res.status(200).json(result);
    } else {
        res.status(404).json({error: 'not found'});
    }
};

const getDough = async (req, res) => {
    console.log('getDough', req.params);
    const {name, size} = req.params;
    const result = await getDoughInfo(name, size);
    if (result) {
        res.status(200).json(result);
    } else {
        res.status(404).json({error: 'not found'});
    }
};

const fetchIngredients = async (req, res) => {
    console.log('fetchIngredients');
    const result = await getAllIngredients();
    if (result) {
        return res.status(200).json({ingredients: result});
    } else {
        return res.status(404).json({error: 'not found'});
    }
}


export {sendData, fetchCalories, getSets, getDough, fetchIngredients};