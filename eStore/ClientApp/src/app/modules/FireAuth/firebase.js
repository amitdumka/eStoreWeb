import firebase from "firebase/app"
import "firebase/auth"

const app= firebase.initializeApp({
    apiKey: "AIzaSyCjhmZ83QSOyHbHb08zUzBaj0rAX5qz2RE",
    authDomain: "estoreai.firebaseapp.com",
    databaseURL: "https://estoreai-default-rtdb.firebaseio.com",
    projectId: "estoreai",
    storageBucket: "estoreai.appspot.com",
    messagingSenderId: "722192579199",
    appId: "1:722192579199:web:5450f3d0337522764e5d4a",
    measurementId: "G-JQEX2XY41P"
});

export const auth=app.auth()
export default app


// export const app = firebase.initializeApp({
//     apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
//     authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
//     databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
//     projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
//     storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
//     messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
//     appId: process.env.REACT_APP_FIREBASE_APP_ID
//   })
  
//   export const auth = app.auth();
//  // export  default app
  
