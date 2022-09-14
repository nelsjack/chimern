import React from 'react'
import { Routes, BrowserRouter, Route } from 'react-router-dom'
import Login from './components/login/Login'
import Register from './components/register/Register'
import Dashboard from './components/dashboard/Dashboard'
import "/node_modules/nes.css/css/nes.min.css";
import "./App.css"

function App() {
  return(
    <BrowserRouter>
    <Routes>
      <Route path="/login" element={<Login/>} />
      <Route path="/register" element={<Register/>} />
      <Route path="/" element={<Dashboard/>}/>
    </Routes>
  </BrowserRouter>
  )
}

export default App;
