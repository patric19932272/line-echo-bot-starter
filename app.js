let express = require('express')
let bodyParser = require('body-parser')
let request = require('request')
let app = express()

const CHANNEL_ACCESS_TOKEN = 'xlGwz5LwbKiQtVMgMRFliSrN8Ru/tuJx87A12dvHASDIgSOmooNbzW5VRbHXtDAstA73V5tWXUl2WbiCjT+m/YXby8X59dFTAAQWqwuNvWGGny9Hml4pFiifDK3SV9IagzxkJzPAFJqHsEcTbt1RlAdB04t89/1O/w1cDnyilFU='
const PORT = process.env.PORT || 3000

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.listen(PORT, function () {
    console.log(`App listening on port ${PORT}!`)
})

// handler receiving messages
app.post('/', function (req, res) {
    let body = req.body
    let text = body.events[0].message.text
    let replyToken = body.events[0].replyToken
    sendMessage(replyToken,text)
    //console.log(body)
    console.log(JSON.stringify(body,null,2))
    //(object,替換的,排版:2格)
    res.send('')
    //送東西以免Line不繼續送
})

// generic function sending messages
function sendMessage(replyToken, text) {
    let body = {
        replyToken,
        messages: [{
            type: 'text',
            text,
        }],
    };

    let options = {
        url: 'https://api.line.me/v2/bot/message/reply',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${CHANNEL_ACCESS_TOKEN}`,
        },
        body,
        json: true,
    };

    request(options, function (error, response, body) {
        if (error) {
            console.log('Error sending message: ', error);
        }
        else if (response.body.error) {
            console.log('Error: ', response.body.error);
        }
    })
}
