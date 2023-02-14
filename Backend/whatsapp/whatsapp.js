var axios = require("axios");

function sendMessage(data) {
    console.log("send message Helper is " + data);
    var config = {
        method: "post",
        url:  ' https://graph.facebook.com/v15.0/113623491619164/messages',
        headers: {
            Authorization: 'Bearer EAANS7WCNzoEBABZBj65PGpIZCAdPLvTNkKQcL9eY3JEOm5jahFZCSmi3ZBxZAGTYdDHg4PPrpii8nmkMhkvkuqZC1O7LyudpVU6EZAtbcaswZBP8vgk5OhlO9bT6jVf82dnZCCVSO0ebc4ZAuRD3vGtuyeYJncHxjpsffjPrItdGO1PDHo0dXqoTsbc3JVmlKuiHzFyeI2pfWExwZDZD',
            "Content-Type": "application/json",
        },
        data: data,
    };
    console.log("config is : " + JSON.stringify(config))
    return axios(config);
}

function getTextMessageInput(recipient, text) {
    console.log("recpient is : " + recipient);
    console.log("text is : " + text);
    return JSON.stringify({
        messaging_product: "whatsapp",
        preview_url: false,
        recipient_type: "individual",
        to: recipient,
        type: "text",
        "text": {
            body: text,
        },
    });
}

module.exports = {
    sendMessage: sendMessage,
    getTextMessageInput: getTextMessageInput,
};
