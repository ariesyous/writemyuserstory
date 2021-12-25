const functions = require("firebase-functions");
const fetch = require('cross-fetch');

exports.createCompletion = functions
    .region("europe-west2")
    .https.onRequest((request, response) => {
        const engineId = "davinci-instruct-beta-v3";
        const url = `https://api.openai.com/v1/engines/${engineId}/completions`;


        response.set("Access-Control-Allow-Origin", "*");
        response.set('Access-Control-Allow-Methods', 'GET,POST,DELETE,HEAD,PUT,OPTIONS');
        response.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

        console.log('Request body is', request.body.userPrompt);

        delete request.body.userPrompt;

        if (request.method === 'OPTIONS') {
            // Send response to OPTIONS requests

            response.status(204).send('');
        } else {

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
                .then(res => {
                    console.log('Response is', res.choices[0].text)
                    response.send(JSON.stringify(res.choices[0].text))
                })
                .catch(error => response.send(error.message));
        }
    });

