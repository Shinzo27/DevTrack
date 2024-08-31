import React, { useContext } from "react";
import ProjectAbout from "../Components/ProjectAbout";
import Tasks from "../Components/Tasks";
import TeamMembers from "../Components/TeamMembers";
import { Navigate, useParams } from 'react-router-dom'
import AddFiles from "../Components/AddFiles";
import Comments from "../Components/Comments";
import { Context } from "../main";

const ProjectDetail = () => {
  const { id } = useParams()
  const { auth } = useContext(Context)
  
  if(!auth.isAuthenticated) return <Navigate to={'/signin'} /> 

  return (
    <div className="pt-7 min-h-screen">
      
      <div className="flex flex-wrap justify-center items-center -mx-4">
        <div className="w-full lg:w-2/3 px-4 mb-4">
          <ProjectAbout projectId={id}/>
          <Tasks projectId={id}/>
          <TeamMembers projectId={id}/>
          <AddFiles projectId={id}/>
          <Comments projectId={id}/>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
