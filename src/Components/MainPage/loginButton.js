import React, { useState, useEffect } from "react";
import {  NavLink } from "react-router-dom";
import { getDoc, doc } from 'firebase/firestore/lite'
import { app, db } from '../LoginPage/LoginMain'
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth"
import { useAuthState } from "react-firebase-hooks/auth"

const auth = getAuth(app)

export function LoginButton() {

    const [username, setUsername] = useState()
    const [user] = useAuthState(auth)

    async function getUser(email) {
        const docRef = doc(db, "Users", `${email}`)
        const docSnap = await getDoc(docRef)
        const snapRef = docSnap.data()
        //console.log(docSnap.data())
        return snapRef
    }

    useEffect(() => {
        onAuthStateChanged(auth, async (userCredential) => {
            if(userCredential) {
                const emailRef = userCredential.email
                const name2 = await getUser(emailRef)
                setTimeout( async ()=> {
                    console.log("Loading")
                    setUsername(await getUser(emailRef).then((u) => {return (u.Username)}).catch((error) => {console.log(error)}))
                }, 300)
                setUsername(name2.Username)
                

            }
        })
    })

    if(user) {
    return (
        <div>
        <button className="log-in-btn"> Account: {username}</button>
        <button className="log-out-btn" onClick={() => auth.signOut()}><NavLink to="/">Sign Out</NavLink></button>
        </div>
    )
    } else {
    return(
        <button className="log-in-btn"> <NavLink to='/login'>Log in</NavLink> </button>
    )
    }
}