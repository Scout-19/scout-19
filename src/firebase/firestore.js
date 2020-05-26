import Firebase from 'firebase'
import 'firebase/firestore'

const config = {
    apiKey: "AIzaSyDbgoNUKKEElBuOfA9gy6KDW9DoiUj9RNY",
    authDomain: "scout-19.firebaseapp.com",
    databaseURL: "https://scout-19.firebaseio.com",
    projectId: "scout-19",
    storageBucket: "scout-19.appspot.com",
    messagingSenderId: "289359018586",
    appId: "1:289359018586:web:550244ef1a3b8a25de3663",
    measurementId: "G-CWFERVQG2Y"
};

const firebaseApp = Firebase.initializeApp(config, 'exercise-vue')
const firestore = firebaseApp.firestore()

export default firestore
