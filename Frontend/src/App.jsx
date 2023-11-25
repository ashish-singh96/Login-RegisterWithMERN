import './App.css'
import React, { useState } from 'react'
import Login from './component/Login/Login'
import Register from './component/Register/Register'
import Homepage from './component/HomePage/Homepage'
import { BrowserRouter as Router, Routes, Route, useSearchParams } from 'react-router-dom';
function App() {
  const [user, setLoginUser] = useState({});



  return (
    <div>
      <Router>
        <Routes>
          <Route
            path="/"
            element={user && user._id ? <Homepage setLoginUser={setLoginUser} /> : <Login setLoginUser={setLoginUser} />}
          />
          <Route path="/login" element={<Login setLoginUser={setLoginUser} />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
