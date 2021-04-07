import firebase from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDtAlUw7vImGmpVNJzP4EoN_50VOeg2WIE",
    authDomain: "travel-app-a9d95.firebaseapp.com",
    projectId: "travel-app-a9d95",
    storageBucket: "travel-app-a9d95.appspot.com",
    messagingSenderId: "2838305790",
    appId: "1:2838305790:web:11b80e83b7f29dcceffeaf"
};

firebase.initializeApp(firebaseConfig);

const provider = new firebase.auth.GoogleAuthProvider();
const auth = firebase.auth();

const login = () => {
    auth.signInWithPopup(provider);
}

const logout = () => {
    auth.signOut();
}

export {
    auth,
    login,
    logout
}