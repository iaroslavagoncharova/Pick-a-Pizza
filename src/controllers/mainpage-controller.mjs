import sendPromptData from "../models/mainpage-model.mjs";

const getPromptNames = async (req, res) => {
    try {
        const names = await sendPromptData();
        if (names.error) {
            res.status(404).json({ error: 'not found' });
            return;
        }
        res.status(200).json(names);
        console.log(names);
    } catch (error) {
        console.error(error, 'Error:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export { getPromptNames};