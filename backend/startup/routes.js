const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const corsOptions = {
  origin: ['https://admin.socket.io', 'https://inkee.io', 'https://inkee-io.herokuapp.com'],
  optionsSuccessStatus: 200,
  credentials: false,
};

module.exports = (app) => {
  app.use(express.json());
  app.use(cookieParser());
  app.use(cors(corsOptions));
};
