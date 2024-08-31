import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import socketIOClient from "socket.io-client";

const ENDPOINT = 'http://localhost:8000'

const Tasks = ({projectId}) => {
  const [ tasks, setTasks ] = useState([])
  const navigateTo = useNavigate();
  const socket = socketIOClient(ENDPOINT)

  useEffect(()=>{
    const getTasks = async() => {
      try {
        const { data } = await axios.get(`http://localhost:8000/api/v1/task/getTasks/${projectId}`, {withCredentials: true})
        setTasks(data.tasks)

        socket.on('taskStatusUpdated', (updatedTask) => {
          setTasks(prevTasks => 
            prevTasks.map(task => task._id === updatedTask._id ? updatedTask : task))
        })

        return () => socket.disconnect(); 
      } catch (error) {
        console.log(error);
      }
    }
    getTasks()
  },[])

  const updateTaskStatus = async(taskId, status) => {
    try {
      const { data } = await axios.put(`http://localhost:8000/api/v1/task/updateTaskStatus/${projectId}/tasks/${taskId}`, {status}, {withCredentials: true})
      toast.success(data.message)
      navigateTo(`/projectDetail/${projectId}`)
    } catch (error) {
      console.log(error.response.data);
    }
  }

  return (
    <div className="bg-white p-4 mt-6 rounded shadow mb-4 overflow-x-auto">
      <h2 className="text-xl font-bold mb-2">Tasks</h2>
      <table className="w-full table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2">Task</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2">Due Date</th>
            <th className="px-4 py-2">Assignee</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task, index) => (
            <tr key={index}>
              <td className="border px-4 py-2">{task.title}</td>
              <td className="border px-4 py-2">
                <select value={task.status} onChange={(e)=>updateTaskStatus(task._id,e.target.value)} className="border px-4 py-2">
                  <option value="Todo">Todo</option>
                  <option value="In-Progress" >In Progress</option>
                  <option value="Done">Completed</option>
                </select>
              </td>
              <td className="border px-4 py-2">{task.deadline}</td>
              <td className="border px-4 py-2">{task.assignedTo.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Tasks;
