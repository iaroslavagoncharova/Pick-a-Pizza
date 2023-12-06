import { fetchPizza } from "../models/shopping-cart-model.mjs";

const getPizzas = async (req, res) => {
    console.log('fetched pizza', req.params);
    console.log(req.params.id);
    const id = req.params.id;
    console.log(id);
    const result = await fetchPizza(id);
    if (result) {
        res.status(201).json(result);
    } else {
        res.status(404).json({error: 'not found'});
    }
};

export {getPizzas};