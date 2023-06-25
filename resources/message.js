// const request = require("request");
const senderAction = require("../templates/senderAction");
// const sendMessage = require("../templates/sendMessage");
const sendGenericTemplate = require("../templates/sendGenericTemplate");
const runCompletion = require("./chat");

module.exports = function processMessage(event) {
    if (!event.message.is_echo) {
        const message = event.message;
        const senderID = event.sender.id;

        console.log("Received message from senderId: " + senderID);
        console.log("Message is: " + JSON.stringify(message));

        if (message.text) {
            // now we will take the text received and send it to an food tracking API.
            let text = message.text;
            // let request = require("request");

            const completion = runCompletion(text);

            senderAction(senderID);
            // after the response is recieved we will send the details in a Generic template
            sendGenericTemplate(senderID, completion.data.choices[0].text);

            /*
            let options = {
                method: "POST",
                url: "https://mefit-preprod.herokuapp.com/api/getnutritionvalue",
                headers: {
                    "cache-control": "no-cache",
                    "content-type": "application/json"
                },
                body: {
                    userID: process.env.USERID,
                    searchTerm: text
                },
                json: true
            };
            request(options, function (error, response, body) {
                if (error) throw new Error(error);
                senderAction(senderID);
                // after the response is recieved we will send the details in a Generic template

                sendGenericTemplate(senderID, body);
            });
            */
        }
    }
}
