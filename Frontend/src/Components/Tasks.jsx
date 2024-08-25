import axios from "axios";
import React, { useEffect, useState } from "react";

const Tasks = ({projectId}) => {
  const [ tasks, setTasks ] = useState([])

  useEffect(()=>{
    const getTasks = async() => {
      const { data } = await axios.get(`http://localhost:8000/api/v1/task/getTasks/${projectId}`, {withCredentials: true})
      setTasks(data.tasks)
    }
    getTasks()
  },[])

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
              <td className="border px-4 py-2">{task.status}</td>
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
