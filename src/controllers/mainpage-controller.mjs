import sendPromptData from "../models/mainpage-model.mjs";

const getPromptNames = async (req, res) => {
    try {
        const names = await sendPromptData();
        res.status(200).json(names);
        console.log(names);
    } catch (error) {
        console.error(error.status, 'Error:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export { getPromptNames};