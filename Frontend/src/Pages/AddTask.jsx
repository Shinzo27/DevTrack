import React, { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
const AddTask = () => {
  const { id } = useParams();
  const navigateTo = useNavigate();
  const [users, setUsers] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [deadline, setDeadline] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const statusDisplay = [
    {
      title: "Default",
    },
    {
      title: "Todo",
    },
    {
      title: "In-Progress",
    },
    {
      title: "Done",
    },
  ];

  useEffect(() => {
    const checkRole = async () => {
      const { data } = await axios.get(
        `http://localhost:8000/api/v1/project/getUsersRole/${id}`,
        { withCredentials: true }
      );
      data.role === "Team Member" ? navigateTo("/dashboard") : null;
    };
    const getUsers = async () => {
      const { data } = await axios.get(
        `http://localhost:8000/api/v1/project/getAllUsers/${id}`,
        { withCredentials: true }
      );
      setUsers(data.users);
    };
    checkRole();
    getUsers();
  }, []);

  const handleAddTask = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:8000/api/v1/task/addTask",
        { title, description, status, deadline, assignedTo, projectId: id },
        { withCredentials: true }
      );
      if (data.success) {
        toast.success(data.message);
        navigateTo(`/projectDetail/${id}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="min-h-screen flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full bg-white px-6 py-8 border-2 shadow-lg rounded-lg">
          <div className="mb-6">
            <h2 className="text-center text-3xl font-bold text-gray-900">
              Add Task
            </h2>
          </div>
          <form className="space-y-6" method="POST" onSubmit={handleAddTask}>
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700"
              >
                Title
              </label>
              <div className="mt-1">
                <input
                  id="title"
                  type="input"
                  required
                  className="block w-full rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                Description
              </label>
              <div className="mt-1">
                <input
                  type="input"
                  required
                  id="description"
                  className="block w-full rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="status"
                className="block text-sm font-medium text-gray-700"
              >
                Status
              </label>
              <div className="mt-1">
                <select
                  className="w-full"
                  onChange={(e) => setStatus(e.target.value)}
                >
                  {statusDisplay.map((status, index) => (
                    <option
                      defaultValue={status.title}
                      value={status.title}
                      key={index}
                    >
                      {status.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label
                htmlFor="deadline"
                className="block text-sm font-medium text-gray-700"
              >
                Deadline
              </label>
              <div className="mt-1">
                <input
                  type="date"
                  id="deadline"
                  required
                  className="block w-full rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Assign To
              </label>
              <div className="mt-1">
                <select
                  className="w-full"
                  onChange={(e) => setAssignedTo(e.target.value)}
                >
                  <option value={'Default'}>Default</option>
                  {users.map((user, index) => (
                    <option value={user.id._id} key={index}>
                      {user.id.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Add Task
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddTask;
