const functions = require("firebase-functions");
const fetch = require('cross-fetch');

exports.applyContentFilter = functions
    .region("europe-west2")
    .https.onRequest((request, response) => {
        const url = `https://api.openai.com/v1/engines/content-filter-alpha/completions`;


        response.set("Access-Control-Allow-Origin", "*");
        response.set('Access-Control-Allow-Methods', 'GET,POST,DELETE,HEAD,PUT,OPTIONS');
        response.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

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
                    console.log('Response is', res)
                        ;
                    response.send(JSON.stringify(computeFilterLabel(res)))
                })
                .catch(error => response.send(error.message));
        }
    });
exports.createCompletion = functions
    .region("europe-west2")
    .https.onRequest((request, response) => {
        const url = `https://api.openai.com/v1/engines/text-davinci-001/completions`;


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


computeFilterLabel = (response) => {
    output_label = response["choices"][0]["text"]

    //  This is the probability at which we evaluate that a "2" is likely real
    //  vs.should be discarded as a false positive
    toxic_threshold = -0.355;

    if (output_label == "2") {
        // If the model returns "2", return its confidence in 2 or other output-labels
        logprobs = response["choices"][0]["logprobs"]["top_logprobs"][0]

        // If the model is not sufficiently confident in "2",
        // choose the most probable of "0" or "1"
        // Guaranteed to have a confidence for 2 since this was the selected token.
        if (logprobs["2"] < toxic_threshold) {
            logprob_0 = logprobs.get("0", null);
            logprob_1 = logprobs.get("1", null);

            // If both "0" and "1" have probabilities, set the output label
            // to whichever is most probable
            if (logprob_0 !== null && logprob_1 !== null) {
                if (logprob_0 >= logprob_1) {
                    output_label = "0";
                } else {
                    output_label = "1";
                }
            }
            // If only one of them is found, set output label to that one
            else if (logprob_0 !== null) {
                output_label = "0";
            } else if (logprob_1 !== null) {
                output_label = "1";
            }

            // If neither "0" or "1" are available, stick with "2"
            // by leaving output_label unchanged.
        }
    }

    if (output_label !== "0" && output_label !== "1" && output_label !== "2") {
        output_label = "2";
    }

    return output_label;
}