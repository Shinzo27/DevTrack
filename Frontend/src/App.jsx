import Footer from "./Components/Footer"
import Navbar from "./Components/Navbar"
import Hero from "./Pages/Hero"
import {BrowserRouter, Outlet, Route, Routes} from 'react-router-dom'
import Signup from "./Pages/Signup"
import Signin from "./Pages/Signin"
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import ProjectDetail from "./Pages/ProjectDetail"
import AddUser from "./Pages/AddUser"
import AddTask from "./Pages/AddTask"
import AddProject from "./Pages/AddProject"
import LandingPage from "./Pages/LandingPage"

function BasicLayout(){
  return (
    <>
      <Navbar/>
      <Outlet/>
      <Footer/>
    </>
  )
}

function LandingLayout(){
  return (
    <>
      <Outlet/>
    </>
  )
}

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<LandingLayout/>} path="/">
            <Route index element={<LandingPage/>}/>
          </Route>
          <Route element={<BasicLayout/>}>
            <Route element={<Hero/>} path="/dashboard"/>
            <Route element={<Signup/>} path="/signup"/>
            <Route element={<Signin/>} path="/signin"/>
            <Route element={<ProjectDetail/>} path="/projectDetail/:id"/>
            <Route element={<AddUser/>} path="/addUser/:id"/>
            <Route element={<AddTask/>} path="/addTask/:id"/>
            <Route element={<AddProject/>} path="/addProject"/>
          </Route>
        </Routes>
        <ToastContainer position="top-center"/>
      </BrowserRouter>
    </>
  )
}

export default App
