/*
Author: chankruze (chankruze@geekofia.in)
Created: Sat Nov 21 2020 00:36:25 GMT+0530 (India Standard Time)

Copyright (c) Geekofia 2020 and beyond
*/

import firebase from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};

const app = firebase.initializeApp(firebaseConfig);

// export auth function
export const auth = app.auth();
export default app;
