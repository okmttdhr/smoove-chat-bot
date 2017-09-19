// @flow

const https = require('https');

module.exports.hello = (event: any) => {
  console.log('event', event);
  const b = JSON.parse(event.body);
  console.log('b', b);
  const message: string = b.events[0].message.text;
  const replyToken: string = b.events[0].replyToken;
  const data = JSON.stringify({
    replyToken,
    messages: [
      {
        type: 'text',
        text: message,
      },
    ],
  });
  const opts = {
    host: 'api.line.me',
    path: '/v2/bot/message/reply',
    headers: {
      'Content-type': 'application/json',
    },
    method: 'POST',
  };
  const req = https.request(opts, (res) => {
    res.on('data', (chunk) => {
      console.log(res.statusCode + chunk.toString());
    });
    req.on('error', (err) => {
      console.log('https.request error', err);
      console.log('https.request error', err.message);
    });
  });
  req.write(data);
  req.end();
};
