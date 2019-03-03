import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';

var config = {
  apiKey: "AIzaSyCAPuc9Lku7mIoRXvrzCd_sDenxrdSsRZI",
  authDomain: "dtpearl-messengr.firebaseapp.com",
  databaseURL: "https://dtpearl-messengr.firebaseio.com",
  projectId: "dtpearl-messengr",
  storageBucket: "dtpearl-messengr.appspot.com",
  messagingSenderId: "699738280331"
};
firebase.initializeApp(config);

export default firebase;
