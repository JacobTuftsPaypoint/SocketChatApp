import React from 'react'

export default function CreateAccMain() {
  return (
    <section className='CreateAccMain'>
      <div className='CreateAccContainer'>
        <input type='text' id='email' placeholder='email'/>
        <input type='text' id='username' placeholder='username'/>
        <input type='password' id='passoword' placeholder='password'/>
        <button id='signInBtn'>Create Account</button>
      </div>
    </section>
  )
}
