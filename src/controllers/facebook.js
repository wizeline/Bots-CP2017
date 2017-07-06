
const requestPromise = require('request-promise');
const wit = require('../controllers/wit');

const isSubscribe = mode => mode === 'subscribe';
const isTokenValid = token => token === process.env.FB_VERIFY_TOKEN;

const getWebhook = (req, res) => {
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  if (isSubscribe(mode) && isTokenValid(token)) {
    console.log('Validating Facebook webhook');
    res.status(200).send(challenge);
  } else {
    console.error('Failed validation. Make sure the validation tokens match.');
    res.sendStatus(403);
  }
};

const receivedMessage = (event) => {
  const senderId = event.sender.id;
  const recipientId = event.recipient.id;
  const messageId = event.message.id;
  const text = event.message.text;

  // Get the entities from Wit here
};

const sendTextMessage = (recipientId, messageText) => {

};

const callSendAPI = (message) => {
  requestPromise({
    uri: 'https://graph.facebook.com/v2.6/me/messages',
    qs: {
      access_token: process.env.PAGE_ACCESS_TOKEN,
    },
    method: 'POST',
    json: message,
  })
    .then((response) => {
      if (response.statusCode === 200) {
        const { recipientId, messageId } = response;

        console.log(`Successfully sent message with id ${messageId} to recipient ${recipientId}`);
      }
    })
    .catch((error) => {
      console.error('Unable to send message.');
      console.error(error);
    });
};

const postWebhook = (req, res) => {

};

module.exports = {
  getWebhook,
  postWebhook,
};
