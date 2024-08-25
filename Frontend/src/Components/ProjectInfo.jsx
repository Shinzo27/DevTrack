import axios from "axios";
import React, { useEffect, useState } from "react";

const ProjectInfo = () => {
  const [tasks, setTasks] = useState([])
  const slicedTask = tasks.slice(0,3)
  useEffect(()=>{
    const getTasks = async() => {
      const { data } = await axios.get('http://localhost:8000/api/v1/task/getTasksOfUser', {withCredentials: true})
      setTasks(data.tasks)
    }
    getTasks()
  }, [])
  return (
    <>
      <div>
        <h2 className="pl-8 text-2xl font-bold">
            Project Details
        </h2>
      </div>
      <div className="p-6 flex flex-col lg:flex-row justify-around gap-6">
        {/* Tasks Section */}
        <div className="flex-1 bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-2xl font-bold mb-2">Tasks</h2>
          <p className="text-gray-400 mb-4">View and manage tasks</p>
          {
            slicedTask.map((task, index)=>(
              <div className="space-y-4" key={index}>
                <div className="flex justify-between items-center pt-3">
                  <div>
                    <h3 className="font-semibold">{task.title}</h3>
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm bg-gray-100 text-gray-500 px-2 py-1 rounded-lg">
                      {task.status}
                    </span>
                    <span className="ml-4">{task.deadline}</span>
                  </div>
                </div>
              </div>
            ))
          }
          
        </div>
        <div className="flex-1 bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-2xl font-bold mb-2">Project List</h2>
          <p className="text-gray-400 mb-4">current projects</p>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span>Project Completion</span>
              <span className="font-bold text-2xl">78%</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Budget Spent</span>
              <span className="font-bold text-2xl">$124k</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Milestones Achieved</span>
              <span className="font-bold text-2xl">12</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectInfo;
