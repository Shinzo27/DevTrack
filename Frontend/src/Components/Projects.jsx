import React, { useEffect, useState } from "react";
import Button from "./Shared/Button";
import axios from "axios";
import { Link } from "react-router-dom";

const Projects = () => {
  const [ projects, setProjects ] = useState([])

  useEffect(()=>{
    const getProjects = async() => {
      const { data } = await axios.get('http://localhost:8000/api/v1/project/getProjects', {withCredentials: true})
      setProjects(data.project)
    }
    getProjects()
  }, [])

  return (
    <>
      <div className="pl-8 flex justify-between items-center">
        <div className="text-2xl font-bold ">Projects</div>
        <div className="p-2 rounded-lg text-white bg-black mr-6"><Link to={'/addProject'}>Add Project</Link></div>
      </div>
      <div className="p-6 flex flex-col justify-center items-center flex-wrap gap-6">
        {projects.map((project, index) => (
          <div
            className="w-full p-5 bg-white shadow-sm border-opacity-10 border border-black rounded-lg flex flex-col justify-between gap-5"
            key={index}
          >
            <div className="flex justify-between">
                <div>
                    <div className="font-bold text-2xl">{ project.projectId.title}</div>
                    <div className="font-medium text-md text-gray-400 ">
                        {project.projectId.description}
                    </div>
                </div>
                <div className="hidden lg:block md:block">
                    <button className="p-2 rounded-lg text-white bg-black"><Link to={`/projectDetail/${project.projectId._id}`}>View Project</Link></button>
                </div>
            </div>
            <div>
              <div className="flex justify-between items-center">
                <div>Start Date</div>
                <div>{project.projectId.startDate}</div>
              </div>
              <div className="flex justify-between items-center pt-4">
                <div>End Date</div>
                <div>{project.projectId.deadline}</div>
              </div>
              <div className="mt-3 p-1 rounded-md w-fit bg-gray-100">
                {project.Status}
              </div>
              <div className="mt-3 p-1 rounded-md w-fit bg-gray-100">
                {project.role}
              </div>
              <div className="pt-3 lg:hidden md:hidden">
                <Button title={"View Project"} bgColor={"Black"} fontColor={"White"}/>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Projects;
