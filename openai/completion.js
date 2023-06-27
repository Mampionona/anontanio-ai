const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config();

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

async function runCompletion(text) {
    try {
        const completion = await openai.createCompletion({
            model: process.env.OPENAI_MODEL,
            max_tokens: 4000,
            prompt: text
        });
        return completion.data.choices[0].text;
    } catch (error) {
        if (error.response) {
            console.log(error.response);
        } else {
            console.log(error.message);
        }
    }
}

module.exports = runCompletion;
