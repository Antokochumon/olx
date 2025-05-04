import firebase from 'firebase' ;
import 'firebase/auth'
import 'firebase/firebase'
import 'firebase/storage'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCeiUjLMc1KmDdxOH0eOYy7SsRvnugwSnI",
    authDomain: "fir-1b4b4.firebaseapp.com",
    projectId: "fir-1b4b4",
    storageBucket: "fir-1b4b4.firebasestorage.app",
    messagingSenderId: "678727006129",
    appId: "1:678727006129:web:b07de9f3b55f3a5d31af90",
    measurementId: "G-VNRR30Q9DH"
  };

  export default firebase.initializeApp(firebaseConfig)