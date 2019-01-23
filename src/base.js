import Rebase from 're-base';
import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyBwyRT-RLMbTxj4MX_epYeJLyFknQ0ihrw",
    authDomain: "trackermbx-6eee5.firebaseapp.com",
    databaseURL: "https://trackermbx-6eee5.firebaseio.com",
    projectId: "trackermbx-6eee5",
    storageBucket: "trackermbx-6eee5.appspot.com",
    messagingSenderId: "117871294143"
};

const app = firebase.initializeApp(config)
const base = Rebase.createClass(app.database())
const facebookProvider = new firebase.auth.FacebookAuthProvider()

export { app, base, facebookProvider }