import React from 'react'
import Stats from '../Components/Stats'
import ProjectInfo from '../Components/ProjectInfo'
import Projects from '../Components/Projects'

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