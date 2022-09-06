import React from 'react'
import { Routes, BrowserRouter, Route } from 'react-router-dom'
import Login from './components/Login'
import Register from './components/Register'
import Dashboard from './components/Dashboard'


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: ''
    }
  }

  render() {
    return (
      <BrowserRouter>
        <Routes>
          <Route element={<Login/>} exact path="/login"/>
          <Route element={<Register/>} exact path="/register"/>
          <Route element={<Dashboard/>} exact path="/dashboard"/>
        </Routes>
      </BrowserRouter>
    )
  }
}


export default App;
