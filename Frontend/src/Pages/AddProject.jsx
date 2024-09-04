import React, { useContext, useState } from 'react'
import { Context } from '../main'
import { Navigate, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'

const AddProject = () => {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [ startDate, setStartDate ] = useState("")
    const [ endDate, setEndDate ] = useState("")
    const navigateTo = useNavigate()

    const addProject = async(e) => {
      e.preventDefault()
      const { data } = await axios.post('http://localhost:8000/api/v1/project/createProject', {title, description, startDate, deadline: endDate, users: { id: user._id, role: 'Product Manager'}}, {withCredentials: true})
      if(data.success) {
        toast.success(data.message)
        navigateTo('/dashboad')
      }
    }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white px-6 py-8 border-2 shadow-lg rounded-lg">
        <div className="mb-6">
          <h2 className="text-center text-3xl font-bold text-gray-900">
            Add Project
          </h2>
        </div>
        <form className="space-y-6" onSubmit={addProject}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Title
            </label>
            <div className="mt-1">
              <input
                id="title"
                name="title"
                type="text"
                required
                value={title}
                onChange={e=>setTitle(e.target.value)}
                className="block w-full rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <div className="mt-1">
              <input
                id="description"
                name="description"
                type="text"
                required
                value={description}
                onChange={e=>setDescription(e.target.value)}
                className="block w-full rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Starting Date
            </label>
            <div className="mt-1">
              <input
                id="StartDate"
                name="StartDate"
                type="date"
                required
                value={startDate}
                onChange={e=>setStartDate(e.target.value)}
                className="block w-full rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
                Deadline
            </label>
            <div className="mt-1">
              <input
                id="deadline"
                name="deadline"
                type="date"
                required
                value={endDate}
                onChange={e=>setEndDate(e.target.value)}
                className="block w-full rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Add Project
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddProject