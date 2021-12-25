const functions = require("firebase-functions");
const fetch = require('cross-fetch');

exports.createCompletion = functions
    .region("europe-west2")
    .https.onRequest((request, response) => {
        const engineId = "davinci-instruct-beta-v3";
        const url = `https://api.openai.com/v1/engines/${engineId}/completions`;


        response.set("Access-Control-Allow-Origin", "*");

        fetch(url, {
            method: "POST",
            body: JSON.stringify(request.body),
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${functions.config().openai.key}`,
            },
        })
            .then((res) => res.json())
            .then(res => response.send(JSON.stringify(res.choices[0].text)))
            .catch(error => response.send(error.message));

    });

