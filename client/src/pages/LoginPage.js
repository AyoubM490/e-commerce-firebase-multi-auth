// Import FirebaseAuth and firebase.
import React from 'react';
import { useState } from 'react';
import { Button, TextField } from '@mui/material';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase/compat/app';
import { getFirestore } from "firebase/firestore";
import 'firebase/compat/auth';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";

// Configure Firebase.
const firebaseConfig = {
  apiKey: process.env.APIKEY,
  authDomain: process.env.AUTHDOMAIN,
  projectId: process.env.PROJECTID,
  storageBucket: process.env.STORAGEBUCKET,
  messagingSenderId: process.env.MESSAGESENDERID,
  appId: process.env.APPID,
  measurementId: process.env.MEASUREMENTID
};

//Initialize Firebase.
firebase.initializeApp(firebaseConfig);

//Initialize Firestore.
const db = getFirestore();


function LoginPage() {

    //Create States
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [loginEmail, setLoginEmail] = useState();
    const [loginPassword, setLoginPassword] = useState();
    const [isUser, setIsUser] = useState();

    function firebaseLogin() {
        const auth = getAuth();
        signInWithEmailAndPassword(auth, loginEmail, loginPassword)
            .then((userCredential) => {
                const user = userCredential.user;
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
            });
    }

    async function firebaseSignup() {
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                const docRef = addDoc(collection(db, "users"), {
                    uid: user.uid,
                    name: name,
                    email: email
                });
            })
        
        console.log(name, " signed up!")
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode);
                console.log(errorMessage);
            })
    }

    // Configure FirebaseUI.
    const uiConfig = {
        signInFlow: 'popup',
        signInOptions: [
            firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            firebase.auth.FacebookAuthProvider.PROVIDER_ID,
            firebase.auth.GithubAuthProvider.PROVIDER_ID,
        ]
    }


    return (
        <div className='login-page'>
          <div className='login-div'>
              <h1 className='login-title'>Educative Shop</h1>
              <div>
                  {isUser ? (<div className='login-box'><h3>Create an account:</h3>
                      <TextField fullWidth size="small" margin="normal" id="signupName" label="Name" variant="outlined" value={name} onChange={e => setName(e.target.value)} />
                      <br />
                      <TextField fullWidth size="small" margin="normal" id="signupEmail" label="Email" variant="outlined" value={email} onChange={e => setEmail(e.target.value)} />
                      <br />
                      <TextField fullWidth size="small" margin="normal" id="signupPassword" label="Password" type="password" variant="outlined" value={password} onChange={e => setPassword(e.target.value)} />
                      <br /><br />
                      <Button variant="contained" onClick={firebaseSignup}>Sign Up</Button>
                  </div>) : (<div className='login-box'><h3>Login:</h3>
                      <TextField fullWidth size="small" margin="normal" id="loginEmail" label="Email" variant="outlined" value={loginEmail} onChange={e => setLoginEmail(e.target.value)} />
                      <br />
                      <TextField fullWidth size="small" margin="normal" id="loginPassword" label="Password" type="password" variant="outlined" value={loginPassword} onChange={e => setLoginPassword(e.target.value)} />
                      <br /><br />
                      <Button variant="contained" onClick={firebaseLogin}>Login</Button>
                  </div>)}
              </div>
              <br />
              <div className="login-switcher">
                  {isUser ? (<Button onClick={() => {
                      setIsUser("")
                  }} size="small" variant="text">Already a user?</Button>) : (<Button onClick={() => {
                      setIsUser("yes")
                  }} size="small" variant="text">Not a user?</Button>)}
              </div>
              <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
          </div>
      </div>
    );
}

export default LoginPage
