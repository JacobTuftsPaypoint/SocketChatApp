import React, {useState} from 'react'
import { app, auth, db } from '../LoginPage/LoginMain'
import { createUserWithEmailAndPassword, setPersistence, browserSessionPersistence, updateProfile } from 'firebase/auth'
import { getFirestore, collection, getDoc, doc, setDoc} from 'firebase/firestore/lite'
import { useNavigate} from "react-router-dom"

import '../../style.css'

export default function CreateAccMain() {

  const [username, setUsername] = useState()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()

  const navigate = useNavigate()

  function signUp() {

    if(email === undefined || username === undefined || password === undefined) {
      alert("Please Fill out ALL Fields")
    } else {

    setPersistence(auth, browserSessionPersistence)
        .then(()=> {
            createUserWithEmailAndPassword(auth, email, password)
            .then(async (userCredential) => {
                await setUserProfile(email, username)
            })
            .then(() => {
              navigate("/")
            })
            .catch((error) => {
                var errorCode = error.code;
                console.log(error.code)
                switch (errorCode) {
                    case "auth/email-already-exists":
                        alert("Email already in use")
                        break;
                    case "auth/invalid-email":
                        alert("Invalid email - check the format")
                        break;
                    case "auth/invalid-display-name":
                        alert("Please Enter a Name")
                        break;
                    case "auth/email-already-in-use":
                        alert("Email already in use")
                        break;
                }
        })})
        .catch((error) => {
            const error2 = error.code
            console.log(error2)
        })
    }
}

async function setUserProfile(email, username) {
  const dbref = collection(db, "Users")
  await setDoc(doc(db, "Users", `${email}`), {
      Username: `${username}`
  })
  console.log(`${username} set`)
}   

async function getUser(email) {
  const docRef = doc(db, "Users", `${email}`)
  const docSnap = await getDoc(docRef)
  //console.log(docSnap.data())
  return docSnap.data()
}

  return (
    <section className='CreateAccMain'>
      <div className='CreateAccContainer'>
        <input type='email' id='email' placeholder='email' onChange={(event) => setEmail(event.target.value)}/>
        <input type='text' id='username' placeholder='username' onChange={(event) => setUsername(event.target.value)}/>
        <input type='password' id='passoword' placeholder='password' onChange={(event) => setPassword(event.target.value)}/>
        <button id='signInBtn' onClick={signUp}>Create Account</button>
      </div>
    </section>
  )
}
