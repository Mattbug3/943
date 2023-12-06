import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../firebase';

export const Login = () => {

  const [error, setError] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async(e) => {
    e.preventDefault()
    const email = e.target[0].value
    const password = e.target[1].value

  try{
    await signInWithEmailAndPassword(auth, email, password)
    navigate('/943/cart')
    }catch(err){
    setError(err)
  }
    
  }

  return (
    <div className='formContainer'>
      <div className='formWrapper'>
        <span className='logo'>94/3</span>
        <span className='title'>Login</span>
        <form onSubmit = { handleSubmit }>
          <input type='email'placeholder='Email Address' />
          <input type='password' placeholder='密码' />
          <button>Login</button>
          {error && <span style={{color: 'red'}}>Something went wrong, please try agian...</span>}
        </form>
        <p>Don't have an account?<Link to='/943/register'>Signup</Link></p>
      </div>
    </div>
  )
}
