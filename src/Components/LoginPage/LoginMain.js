import React from 'react'
import { NavLink } from 'react-router-dom'

export default function LoginMain() {
  return (
    <section className='loginFormContainer'>
      <div className="LoginContainer">
        <input type="text" id="username" placeholder="username" />
        <input type="password" id="passoword" placeholder="password" />

        <div className="btn-container">
          <button id="signInBtn">Sign in with Google</button>
          <button id="signInBtn">Sign in</button>
          <button id="signInBtn"><NavLink to='/createAccount'>Create an account</NavLink></button>
        </div>
      </div>
    </section>
  )
}
