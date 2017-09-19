'use strict';

var https = require('https');

module.exports.hello = (event, context, callback) => {
  console.log('event', event);
  var b = JSON.parse(event.body);
  console.log('b', b);
  var message = b.events[0].message.text;
  var replyToken = b.events[0].replyToken;
  var data = JSON.stringify({
    replyToken: replyToken,
    messages: [
      {
        type: 'text',
        text: message,
      },
    ],
  })
  var opts = {
    host: 'api.line.me',
    path: '/v2/bot/message/reply',
    headers: {
      "Content-type": "application/json",
      "Authorization": "Bearer"
    },
    method: 'POST',
  };
  var req = https.request(opts, function(res){
    res.on('data', function (chunk) {
      console.log(res.statusCode + chunk.toString());
    });
    req.on('error', function(err) {
      console.log('https.request error', err);
      console.log('https.request error', err.message);
    });
  });
  req.write(data);
  req.end();
};
