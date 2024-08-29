import React, { createContext, useState } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'  

export const Context = createContext()

const AppWrapper = () =>{
  const [auth, setAuth] = useState({      
    isAuthenticated: false,
    user: null,
    token: null
  })

  const login = (userData, token) => {
    setAuth({
      isAuthenticated: true,
      user: userData,
      token: token
    })
  }

  const logout = () => {
    setAuth({
      isAuthenticated: false,
      user: null,
      token: null
    })
  }

  return (
    <Context.Provider value={{ auth, login, logout }}>
      <App/>
    </Context.Provider>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppWrapper/>
  </React.StrictMode>
)
