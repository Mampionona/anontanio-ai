const request = require("request");

module.exports = function sendGenericTemplate(recipientId, respBody) {
    request({
        url: "https://graph.facebook.com/v2.6/me/messages",
        qs: { access_token: process.env.PAGE_ACCESS_TOKEN },
        method: "POST",
        json: {
            recipient: { id: recipientId },
            message: respBody
        }
    }, (error, response, body) => {
        if (error) {
            console.log("Error sending message: " + response.error)
        }
    })
};
