import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'

const AddUser = () => {
    const { id } = useParams()

    const navigateTo = useNavigate()
    const [ name, setName ] = useState("")
    const [ email, setEmail ] = useState("")
    const [ role, setRole ] = useState("")

    const handleAddUser = async(e) => {
      e.preventDefault()
      try {
        const { data }  = await axios.post(`http://localhost:8000/api/v1/project/addUser/${id}`, {name, email,role}, {withCredentials: true})
        if(data.success === true) {
          toast.success(data.message)
          navigateTo(`/projectDetail/${id}`)
        }
      } catch (error) {
        console.log(error);
      }
    }

    useEffect(()=>{
        const checkRole = async() => {
            const { data } = await axios.get(`http://localhost:8000/api/v1/project/getUsersRole/${id}`, {withCredentials: true})
            if(data.role === "Team Member") return navigateTo('/dashboard')
        }
        checkRole()
    })
  return (
    <div>
      <div className="min-h-screen flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white px-6 py-8 border-2 shadow-lg rounded-lg">
        <div className="mb-6">
          <h2 className="text-center text-3xl font-bold text-gray-900">
            Add user
          </h2>
        </div>
        <form className="space-y-6" onSubmit={handleAddUser}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <div className="mt-1">
              <input
                id="name"
                type="imput"
                required
                className="block w-full rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                value={name}
                onChange={e=>setName(e.target.value)}
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email address
            </label>
            <div className="mt-1">
              <input
                id="email"
                type="email"
                autoComplete="email"
                required
                className="block w-full rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                value={email}
                onChange={e=>setEmail(e.target.value)}
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Role
            </label>
            <div className="mt-1">
              <select className='w-full p-3 text-sm decoration-none' value={role} onChange={e=>setRole(e.target.value)}>
                <option value={"Product Manager"}>Product Manager</option>
                <option value={"Team Member"}>Team Member</option>
              </select>
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Add User
            </button>
          </div>
        </form>
      </div>
    </div>
    </div>
  )
}

export default AddUser