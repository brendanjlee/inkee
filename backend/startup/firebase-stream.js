const EventSource = require('eventsource');
const config = require('../config');
const evtSource = new EventSource(config.databaseEventSource);

let handshakeSent = false;

evtSource.onerror = (e) => {
  console.log(e);
};

evtSource.onopen = (e) => {
  console.log('Connected to Realtime Database ' + e);
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

evtSource.addEventListener('cancel', (e) => {
  console.log('Cannot read change. ' + e);
});

evtSource.addEventListener('auth_revoked', (e) => {
  console.log('Lost connection to Realtime Database ' + e);
});

module.exports = {
  evtSource,
};
