import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Stats = () => {
    const [totalProjects, setTotalProjects] = useState(0)
    const [totalTasks, setTotalTasks] = useState(0)
    const [completedProject, setCompletedProject] = useState(0)
    const [deadlines, setDeadlines] = useState(0)

    useEffect(()=>{
        const getStats = async() => {
            try {
                const { data } = await axios.get('http://localhost:8000/api/v1/user/getStats', {withCredentials: true})
                if(data.success) {
                    setTotalProjects(data.totalProjects)
                    setTotalTasks(data.totalTasks)
                    setCompletedProject(data.completedProject)
                    setDeadlines(data.deadline)
                }
            } catch (error) {
                console.log(error);
            }
        }
        getStats()
    }, [])

  return (
    <div className='p-10 flex flex-wrap justify-around items-center gap-6 '>
        <div className='w-[390px] h-48 p-5 bg-white rounded-xl border-opacity-10 border border-black flex justify-around flex-col shadow-sm'>
            <div>
                <h1 className='text-3xl font-semibold'>Project</h1>
                <p className='text-sm text-gray-400'>Total number of projects</p>   
            </div>
            <div className='font-bold text-4xl'>
                {totalProjects}
            </div>
        </div>
        <div className='w-[390px] h-48 p-5 bg-white rounded-xl border-opacity-10 border border-black flex justify-around flex-col shadow-sm'>
            <div>
                <h1 className='text-3xl font-semibold'>Tasks</h1>
                <p className='text-sm text-gray-400'>Pending and completed task</p>
            </div>
            <div className='font-bold text-4xl'>
                {totalTasks}
            </div>
        </div>
        <div className='w-[390px] h-48 p-5 bg-white rounded-xl border-opacity-10 border border-black flex justify-around flex-col shadow-sm'>
            <div>
                <h1 className='text-3xl font-semibold'>Completed Projects</h1>
                <p className='text-sm text-gray-400'>Completed projects till the date</p>
            </div>
            <div className='font-bold text-4xl'>
                {completedProject}
            </div>
        </div>
        <div className='w-[390px] h-48 p-5 bg-white rounded-xl border-opacity-10 border border-black flex justify-around flex-col shadow-sm'>
            <div>
                <h1 className='text-3xl font-semibold'>Deadline</h1>
                <p className='text-sm text-gray-400'>Upcoming project deadlines</p>
            </div>
            <div className='font-bold text-4xl'>
                {deadlines}
            </div>
        </div>
    </div>
  )
}

export default Stats