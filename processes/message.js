const senderAction = require("../templates/senderAction");
const sendGenericTemplate = require("../templates/sendGenericTemplate");
const runCompletion = require("../openai/completion");

module.exports = function processMessage(event) {
    if (!event.message.is_echo) {
        const message = event.message;
        const senderID = event.sender.id;

        console.log("Received message from senderId: " + senderID);
        console.log("Message is: " + JSON.stringify(message));

        if (message.text) {
            const text = message.text;

            if (!text.startsWith("NO_AI")) {
                // now we will take the text received and send it to the OpenAI API.
                senderAction(senderID);
                // after the response is recieved we will send the details in a Generic template
                runCompletion(text).then((completion) => sendGenericTemplate(senderID, completion));
            }
        }
    }
}
