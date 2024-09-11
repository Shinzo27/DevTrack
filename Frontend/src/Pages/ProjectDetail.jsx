import React from "react";
import ProjectAbout from "../Components/ProjectAbout";
import Tasks from "../Components/Tasks";
import TeamMembers from "../Components/TeamMembers";
import { Navigate, useParams } from 'react-router-dom'
import AddFiles from "../Components/AddFiles";
import Comments from "../Components/Comments";
import { useRecoilValue } from "recoil";
import { authState } from "@/State/atom";

const ProjectDetail = () => {
  const { id } = useParams()
  const auth = useRecoilValue(authState)
  
  if(!auth.isAuthenticated) return <Navigate to={'/signin'} />  

  return (
    <div className="pt-7 min-h-screen">
      
      <div className="flex flex-wrap justify-center items-center -mx-4">
        <div className="w-full lg:w-2/3 px-4 mb-4">
          <ProjectAbout projectId={id}/>
          <Tasks projectId={id}/>
          <TeamMembers projectId={id}/>
          <Comments projectId={id}/>
          <AddFiles projectId={id}/>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
