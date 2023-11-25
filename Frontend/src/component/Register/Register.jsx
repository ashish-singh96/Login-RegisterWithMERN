import React, { useState } from 'react'
import axios from 'axios';
import './Register.css';
import {useNavigate} from 'react-router-dom'
const Register = () => {
  const history =useNavigate();
   const  [user, setUser] = useState({
    name:"",
    email:"",
    password:"",
    reEnterPassword:"",

   })

   const handleChange = (e) =>{
    const{name,value}=e.target;
    setUser({...user, [name]:value});
   }

   const handleLogin = () =>{
    history('/login')
   }

   const register = () =>{
      const{name,email,password, reEnterPassword}=user;

      if(name && email && password && (password===reEnterPassword)){
        axios.post("http://localhost:4000/register", user)
        .then(res => {alert(res.data.msg)
          history('/login');
        })

      }else{
        alert("Invalid")
      }
       

   }
  return (
    <div className='register'>
          <h1>Register</h1>
          <input type='text' name='name' value={user.name} placeholder='Enter your name' onChange={handleChange}/>
          <input type='text' name='email' value={user.email} placeholder='Enter your email' onChange={handleChange}/>
          <input type='password' name='password' value={user.password} placeholder='Enter your password' onChange={handleChange}/>
          <input type='password' name='reEnterPassword' value={user.reEnterPassword} placeholder='Enter your re-enterpassword' onChange={handleChange}/>
          <div className='button' onClick={register}>Register</div>
          <div>Or</div>
          <div className='button' onClick={handleLogin}>Login</div>
    </div>
  )
}

export default Register