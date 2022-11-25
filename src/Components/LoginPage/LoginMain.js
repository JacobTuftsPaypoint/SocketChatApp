import { Navigate, NavLink, useNavigate } from 'react-router-dom'

import { initializeApp } from 'firebase/app'
import { getFirestore, collection, getDoc, doc, setDoc} from 'firebase/firestore/lite'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, setPersistence, browserSessionPersistence, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth"
import React, {useState} from 'react'
import { useAuthState } from "react-firebase-hooks/auth"


const firebaseConfig = {
  // apiKey: "AIzaSyCctb-gcyuZjIy16B7SsYGKhhb99pBgkgY",
  // authDomain: "movie-webapp-7e024.firebaseapp.com",
  // projectId: "movie-webapp-7e024",
  // storageBucket: "movie-webapp-7e024.appspot.com",
  // messagingSenderId: "45182074221",
  // appId: "1:45182074221:web:d84c01038b21915a0a6e64",
  // measurementId: "G-XQK5SGJ01P"
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: "movie-webapp-7e024",
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APPID,
  measurementId: process.env.REACT_APP_MEASUREMENTID
};

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const googleProvider = new GoogleAuthProvider();
const db = getFirestore(app)

export default function LoginMain() {

  const [username, setUsername] = useState()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()

  const navigate = useNavigate();

  
  async function getUser(email) {
      const docRef = doc(db, "Users", `${email}`)
      const docSnap = await getDoc(docRef)
      //console.log(docSnap.data())
      return docSnap.data()
  }

  async function setUserProfile(email, username) {
    const dbref = collection(db, "Users")
    await setDoc(doc(db, "Users", `${email}`), {
        Username: `${username}`
    })
    console.log(`${username} set`)
  } 

  function signIn() {
      setPersistence(auth, browserSessionPersistence)
      .then(async () => {
          await signInWithEmailAndPassword(auth, email, password)
          .then((userCred) => {
              if (userCred) {
                  userCred.user.displayName = username
                  console.log("signed in " + auth.currentUser.displayName)
              }
          })
          .then(() => {
            navigate("/")
          })
          .catch((error) => {
              console.log(error.code)
              var errorCode = error.code;
                switch (errorCode) {
                  case "auth/invalid-email":
                      alert("Invalid Email");
                      break;
                  case "auth/wrong-password":
                      alert("Invalid Password");
                      break;
                  case "auth/user-not-found":
                      alert("User Doesnt Exist - Please Check your Email and Username")
                      break;
                  case "auth/missing-email":
                      alert("Please enter your email")
                      break;
                  case "auth/internal-error":
                      alert("Please enter your password")
                      break;
                  case "":
                      alert("")
                      break;
                }
          })
          let u1 = await getUser(email)
          console.log(u1.Username)
      }).catch ((error) => {
          console.log(error)
      })
  }

  function googleSignUp() {
      setPersistence(auth, browserSessionPersistence)
      .then (async () => {
              signInWithPopup(auth, googleProvider)
              .then(async (result) => {
                  const credential = GoogleAuthProvider.credentialFromResult(result);
                  const token = credential.accessToken;
                  const userResultName = result.user.displayName
                  const userResultEmail = result.user.email
                  await setUserProfile( userResultEmail, userResultName).then(async () => console.log(console.log(result.user.displayName)))
              })
              .then(() => {
                navigate("/")
              })
              .catch((error) => {
                  console.log(error.code)
                  var errorCode = error.code
                  switch (errorCode) {
                      case "auth/account-exists-with-different-credential":
                          alert("User already exists")
                          break;
                      case "auth/popup-blocked":
                          alert("Please enable pop-ups in your browser settings")
                          break;
                      case "auth/popup-closed-by-user":
                          alert("You have closed the pop-up before finishing sign up")
                  }
              })

      }).catch ((error) => {
          console.log(error.code)
      })
  }

  return (
    <section className='loginFormContainer'>
      <div className="LoginContainer">
        <input type="text" id="email" placeholder="email" onChange={(event) => setEmail(event.target.value)} />
        <input type="password" id="passoword" placeholder="password" onChange={(event) => setPassword(event.target.value)} />

        <div className="btn-container">
          <button id="signInBtn" onClick={googleSignUp}>Sign in with Google</button>
          <button id="signInBtn" onClick={signIn}>Sign in</button>
          <button id="signInBtn"><NavLink to='/createAccount'>Create an account</NavLink></button>
        </div>
      </div>
    </section>
  )
}

export {
  app,
  auth,
  db
}
