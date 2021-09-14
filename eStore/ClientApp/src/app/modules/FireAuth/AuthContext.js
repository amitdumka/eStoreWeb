import React, { useContext, useState, useEffect } from "react"
import { auth } from "./firebase"
import firebase from "firebase/app"
import { useDispatch} from "react-redux";
import  * as LoginActions from "../../modules/Auth/_redux/authRedux";
import {GetUserInfo} from "../../../_estore/data/UserInfo";

const AuthContext = React.createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);
  const [accessToken, setAccessToken] = useState(null);
  const [error, setError] = useState('');
  const dispatch = useDispatch();

function getUser() { return auth.currentUser;}
function getProviderId() {return auth.provider;}
function isAuthorized(){return auth.isSignedIn; }
function isAuthenticated(){return auth.isSignedIn;}
  function loginWithGoogle(){
    
    var provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/contacts.readonly'); 
    provider.setCustomParameters({
    'login_hint': 'user@example.com'
    });

  return firebase.auth().signInWithPopup(provider).then((result) => {
    /** @type {firebase.auth.OAuthCredential} */
    var credential = result.credential;
    // This gives you a Google Access Token. You can use it to access the Google API.
    //var token = credential.accessToken;
    setAccessToken(credential.accessToken);
    // The signed-in user info.
    //var user = result.user;
    setCurrentUser(result.user);
    //LoginActions.actions.setUser(result.user);
    updateInfo(result.user);
    setLoading(false);
    // ...
  }).catch((error) => {
    // Handle Errors here.
    setError("ErrorCode: "+error.code+"\nMessage: "+error.message);
    //var errorCode = error.code;
    //var errorMessage = error.message;
    // The email of the user's account used.
    //var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    //var credential = error.credential;
    // ...
  });
  }


  function signup(email, password) {
    return auth.createUserWithEmailAndPassword(email, password)
  }

  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password)
  }

  function logout() {
    return auth.signOut()
  }

  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email)
  }

  function updateEmail(email) {
    return currentUser.updateEmail(email)
  }

  function updatePassword(password) {
    return currentUser.updatePassword(password)
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user);
      setLoading(false);
      //LoginActions.actions.setUser(user);
      updateInfo(user);
    })
    return unsubscribe
  });
//Here above line was },[]);

  function updateInfo(user){
    const cUser= GetUserInfo(user);
    dispatch(LoginActions.actions.setUser(cUser));
  }

  const value = {
    currentUser,
    login,
    signup,
    logout,
    resetPassword,
    updateEmail,
    updatePassword, 
    loginWithGoogle, 
    getProviderId, 
    getUser, 
    isAuthorized,isAuthenticated
  }

  return (
    <AuthContext.Provider value={value} ErrorMessage={error} AccessToken={accessToken}>
      {!loading && children}
    </AuthContext.Provider>
  )
}
