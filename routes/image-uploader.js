const firebase = require('../firebase/firebase-admin');
const express = require('express');
const router = express.Router();
const multer = require('multer');
const config = require('../config');

const bucket = firebase.storage().bucket(config.storageBucket);

const upload = multer({
  storage: multer.memoryStorage()
});

router.post('/upload', upload.single('file'), (req, res) => {
  if(!req.file) {
    res.status(400).send("Error: No files found")
  } else {
    const blob = bucket.file('avatars/' + req.file.originalname);
      
    const blobWriter = blob.createWriteStream({
      metadata: {
        contentType: req.file.mimetype
      }
    });
      
    blobWriter.on('error', (err) => {
      console.log(err)
    });
    
    blobWriter.on('finish', () => {
      res.status(200).send(`https://storage.googleapis.com/${config.storageBucket}/${req.file.originalname}`);
    });
      
    blobWriter.end(req.file.buffer)
  };
});

module.exports = {
  router,
}
