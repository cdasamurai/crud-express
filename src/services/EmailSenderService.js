const Mailjet = require('node-mailjet');
const mailjet = Mailjet.apiConnect(
    process.env.MJ_APIKEY_PUBLIC,
    process.env.MJ_APIKEY_PRIVATE,
);

function emailSender({email, fullName}, {subject, body}) {
    const request = mailjet
        .post('send', { version: 'v3.1' })
        .request({
            Messages: [
                {
                    From: {
                        Email: "majid.beneddine@wildcodeschool.com",
                        Name: "Mailjet Pilot"
                    },
                    To: [
                        {
                            Email: email,
                            Name: fullName
                        }
                    ],
                    Subject: subject,
                    TextPart: body,
                    HTMLPart: `<h3>${body}</h3>`
                }
            ]
        })
    request
        .then((result) => {
            console.log(result.body)
        })
        .catch((err) => {
            console.log(err.statusCode)
        })
}

function kindChecker(kind, data) {
    switch (true) {
        case kind === "REGISTRATION": emailSender(data, {subject: "E mail de confirmation", body: "Votre inscription a bien été prise en compte"});
            break;
        case kind === "FORGOTTEN_PASSWORD":
            break;
        case kind === "SUCCESS_ORDER":
            break;
    }
}

module.exports = kindChecker;