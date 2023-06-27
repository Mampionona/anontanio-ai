const request = require("request");
const senderAction = require("../templates/senderAction");
const sendMessage = require("../templates/sendMessage");

module.exports = function processPostback(event) {
    const senderID = event.sender.id;
    const payload = event.postback.payload;

    if (payload === "WELCOME") {
        request({
            url: "https://graph.facebook.com/v2.6/" + senderID,
            qs: {
                access_token: process.env.PAGE_ACCESS_TOKEN,
                fields: "first_name"
            },
            method: "GET"
        }, (error, response, body) => {
            senderAction(senderID);

            if (error) {
                sendMessage(senderID, `Error getting user name: ${error}`);
            } else {
                const { first_name } = JSON.parse(body);
                const text = `Bonjour! Je m'appelle ${first_name}. Comment allez-vous?`;
                runCompletion(text).then((greeting) => sendMessage(senderID, { text: greeting }));
            }
        });
    }
}
