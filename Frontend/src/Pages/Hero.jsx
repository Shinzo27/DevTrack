import React, { useContext } from 'react'
import Stats from '../Components/Stats'
import ProjectInfo from '../Components/ProjectInfo'
import Projects from '../Components/Projects'
import { Navigate, useNavigate } from 'react-router-dom'
import { Context } from '../main'

const Hero = () => {
  return (
    <div className='bg-slate-50 min-h-screen'>
        <Stats/>
        <ProjectInfo/>
        <Projects/>
    </div>
  )
}

export default Hero