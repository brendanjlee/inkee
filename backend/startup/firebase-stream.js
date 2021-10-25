const EventSource = require('eventsource');
const config = require('../config');
const evtSource = new EventSource(config.databaseEventSource);

let handshakeSent = false;

evtSource.onerror = (e) => {
  console.log(e);
};

evtSource.onopen = (e) => {
  console.log('Connected to Realtime Database');
};

evtSource.addEventListener('patch', (e) => {
  console.log(e.data);
});

evtSource.addEventListener('put', (e) => {
  if (handshakeSent) {
    console.log(e.data);
  } else {
    handshakeSent = true;
  }
});

module.exports = {
  evtSource,
};
