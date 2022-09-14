//CONEXIÓN CON LA DB
import firebase from "firebase";

const app = firebase.initializeApp({
  apiKey: "md9MSYiAiNJZmxVju4H3tgfzfXT1g7qh9IvXhmbJ",
  authDomain: "projectID.firebaseapp.com",
  databaseURL: "https://apx-dwf-m6-elg-default-rtdb.firebaseio.com",
});

const rtdb = firebase.database();

export { rtdb };
