const express = require('express');
const app = express();
require('./startup/routes')(app);


// App Initialization
const port = process.env.PORT || 3000;
app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});
app.listen(port, () => console.log(`Listening on port ${port}...`));

