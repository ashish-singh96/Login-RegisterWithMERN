import React, { useState } from 'react'
import './Login.css';
import axios from 'axios'
// import {useHistory} from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
const Login = ({ setLoginUser }) => {

  const history = useNavigate();

  const [user, setUser] = useState({
    email: "",
    password: ""
  })

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value })
  }


  const login = () => {
    axios.post("http://localhost:4000/login", user)
      .then(res => {
        alert(res.data.msg)
        setLoginUser(res.data.user)
        history('/')
      })

  }

  const handleClick = () => {
    history('/register')
  }
  return (
    <div className='login'>
      <h1>Login</h1>
      <input type='text' name='email' value={user.email} placeholder='Enter your email' onChange={handleChange} />
      <input type='password' name='password' value={user.password} placeholder='Enter your password' onChange={handleChange} />
      <div className='button' onClick={login}>Login</div>
      <div>Or</div>
      <div className='button' onClick={handleClick}>Register</div>
    </div>
  )
}

export default Login