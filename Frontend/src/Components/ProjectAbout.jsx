import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ProjectAbout = ({ projectId }) => {
  const navigateTo = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {
    const fetchDetails = async () => {
      const { data } = await axios.get(
        `http://localhost:8000/api/v1/project/getProjectDetail/${projectId}`,
        { withCredentials: true }
      );
      const response = await axios.get(
        `http://localhost:8000/api/v1/project/getUsersRole/${projectId}`,
        { withCredentials: true }
      );
      setRole(response.data.role);
      setName(data.projectDetails[0].title);
      setDescription(data.projectDetails[0].description);
      setStatus(data.projectDetails[0].status);
      setStartDate(data.projectDetails[0].startDate);
      setEndDate(data.projectDetails[0].deadline);
    };
    fetchDetails();
  }, []);

  const handleMarkAsCompleted = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8000/api/v1/project/markAsCompleted/${projectId}`,
        { withCredentials: true }
      );
      if (data.success === true) {
        setStatus("Done");
        toast.success(data.message);
        navigateTo('/dashboard')
      }  
    } catch (error) {
      toast.error(error.response.data.message)
    }
  };

  return (
    <>
      <div className="flex justify-around items-center mb-4">
        <h1 className="text-2xl font-bold">{name}</h1>

        {
          status === 'Todo' ? (
        <div className="flex justify-center items-center gap-5">
          <button className="bg-black text-white px-4 py-2 rounded-lg" disabled>
            {status}
          </button>
          {
            role === 'Product Manager' ? (
              <>
              <button className="bg-black text-white px-4 py-2 rounded-lg">
                <Link to={`/addUser/${projectId}`}>
                  Add User
                </Link>
              </button>
              <button className="bg-black text-white px-4 py-2 rounded-lg">
                <Link to={`/addTask/${projectId}`}>
                Add Task
                </Link>
              </button>
              <button className="bg-black text-white px-4 py-2 rounded-lg" onClick={handleMarkAsCompleted}>
                Mark as Completed
              </button>
              </>
            ) : null
          }
        </div>
          ) : (
            <button className="bg-black text-white px-4 py-2 rounded-lg" disabled>
            {status}
          </button>
          )
        }
      </div>
      <div className="bg-white p-4 rounded shadow mb-4 max-w-3xl mx-auto">
        <h2 className="text-xl font-bold mb-2">Project Details</h2>
        <div className="mb-4">
          <label className="block font-semibold mb-1">Name</label>
          <input
            type="text"
            className="w-full border rounded p-2"
            disabled
            value={name}
          />
        </div>
        <div className="mb-4">
          <label className="block font-semibold mb-1">Description</label>
          <textarea
            className="w-full border rounded p-2"
            placeholder="Project Description"
            value={description}
            readOnly
          ></textarea>
        </div>
        <div className="mb-4">
          <label className="block font-semibold mb-1">Status</label>
          <input
            type="text"
            className="w-full border rounded p-2"
            disabled
            value={status}
            readOnly
          />
        </div>
        <div className="mb-4">
          <label className="block font-semibold mb-1">Start Date</label>
          <input
            type="date"
            className="w-full border rounded p-2"
            value={startDate}
            readOnly
          />
        </div>
        <div className="mb-4">
          <label className="block font-semibold mb-1">End Date</label>
          <input
            type="date"
            className="w-full border rounded p-2"
            value={endDate}
            readOnly
          />
        </div>
      </div>
    </>
  );
};

export default ProjectAbout;
