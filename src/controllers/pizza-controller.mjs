import sendInfo from "../models/pizza-model.mjs";


const sendData = async (req, res) => {
    console.log('sendData', req.body);
    const result = await sendInfo(req.body);
    if (result) {
        res.status(201).json(result);
    } else {
        res.status(404).json({error: 'not found'});
    }
}

export default sendData;