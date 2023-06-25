const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config();

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// async function runCompletion() {
//     const completion = await openai.createCompletion({
//         model: "text-davinci-003",
//         prompt: "Bonjour",
//         max_tokens: 4000
//     });
//     console.log(completion.data.choices[0].text);
// }
// runCompletion();

async function runCompletion(text) {
    try {
        const completion = await openai.createCompletion({
            // model: "text-davinci-003",
            model: process.env.OPENAI_MODEL,
            max_tokens: 4000,
            prompt: text
        });
        // console.log(completion.data.choices[0].text);
        // return completion.data.choices[0].text;
        return completion;
    } catch (error) {
        if (error.response) {
            console.log(error.response.status);
            console.log(error.response.data);
        } else {
            console.log(error.message);
        }
    }
}

modules.exports = runCompletion;
