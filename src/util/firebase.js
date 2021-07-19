import firebase from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyCE48I763ZLKCnpB4GjmGBzvq_gGviUtJk",
    authDomain: "form-test-18f69.firebaseapp.com",
    databaseURL: "https://form-test-18f69-default-rtdb.firebaseio.com",
    projectId: "form-test-18f69",
    storageBucket: "form-test-18f69.appspot.com",
    messagingSenderId: "908737849777",
    appId: "1:908737849777:web:86eba43d5e354592db3590",
    measurementId: "G-YPZ8SKQP34"
};


firebase.initializeApp(firebaseConfig);

export default firebase;