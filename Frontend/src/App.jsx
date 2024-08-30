import Footer from "./Components/Footer"
import Navbar from "./Components/Navbar"
import Hero from "./Pages/Hero"
import {BrowserRouter, Route, Router, Routes} from 'react-router-dom'
import Signup from "./Pages/Signup"
import Signin from "./Pages/Signin"
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import ProjectDetail from "./Pages/ProjectDetail"
import AddUser from "./Pages/AddUser"
import AddTask from "./Pages/AddTask"
import AddProject from "./Pages/AddProject"
import { useContext, useEffect } from "react"
import axios from "axios"
import { Context } from "./main"

function App() {
  const { auth } = useContext(Context)
  
  const getUserInfo = async() => {
    const { data } = await axios.get('http://localhost:8000/api/v1/user/getUserInfo', {withCredentials: true})
    console.log(data);
    console.log(auth.user);
  }

  useEffect(() => {
    getUserInfo()
  }, [])

  return (
    <>
      <BrowserRouter>
      <Navbar/>
        <Routes>
          <Route element={<Hero/>} path="/"/>
          <Route element={<Signup/>} path="/signup"/>
          <Route element={<Signin/>} path="/signin"/>
          <Route element={<ProjectDetail/>} path="/projectDetail/:id"/>
          <Route element={<AddUser/>} path="/addUser/:id"/>
          <Route element={<AddTask/>} path="/addTask/:id"/>
          <Route element={<AddProject/>} path="/addProject"/>
        </Routes>
       <Footer/>
        <ToastContainer position="top-center"/>
      </BrowserRouter>
    </>
  )
}

export default App
