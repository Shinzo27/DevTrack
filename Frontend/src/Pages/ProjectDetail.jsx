import React from "react";
import ProjectAbout from "../Components/ProjectAbout";
import Tasks from "../Components/Tasks";
import TeamMembers from "../Components/TeamMembers";
import { useParams } from 'react-router-dom'
import AddFiles from "../Components/AddFiles";
import Comments from "../Components/Comments";

const ProjectDetail = () => {
  const { id } = useParams()

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
