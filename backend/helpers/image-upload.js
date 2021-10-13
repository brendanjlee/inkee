const multer = require('multer');
const admin = require('../firebase/firebase');
const uuid = require('uuid-v4');

async function uploadFile(filename) {
  const metadata = {
    metadata: {
      firebaseStorageDownloadTokens: uuid()
    },
    contentType: 'image/png',
    cacheControl: 'public, max-age=31536000',
  };

  const bucket = admin.storage().bucket();
  await bucket.upload(filename, {
    gzip: true,
    metadata: metadata,
  });

  console.log(`${filename} uploaded.`);
}

module.exports = {
  uploadFile,
};

