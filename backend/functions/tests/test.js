const firebase = require('@firebase/rules-unit-testing');

const initializeApp = (user) => {
  const app = firebase.initializeTestApp({
    storageBucket: "default-bucket",
    projectId: "fake-id",
    auth: user,
  });

  const storage = app.storage();

  return storage;
};


