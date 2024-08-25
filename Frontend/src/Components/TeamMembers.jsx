import axios from "axios";
import React, { useEffect, useState } from "react";

const TeamMembers = ({projectId}) => {
  useEffect(()=>{
    const fetchMembers = async() => {
      const { data } = await axios.get(`http://localhost:8000/api/v1/project/getAllUsers/${projectId}`, { withCredentials: true })
      setTeamMembers(data.users)
    }
    fetchMembers()
  }, [])

  const [ teamMembers, setTeamMembers]  = useState([])

  return (
    <div className="flex-1 bg-white p-6 mt-8 rounded-xl shadow-lg max-w-4xl mx-auto mb-5">
      <h2 className="text-2xl font-bold mb-2">Team Members</h2>
      <p className="text-gray-400 mb-4">View all team members</p>
      <div className="space-y-4">
        {teamMembers.map((member, index) => (
          <div
            key={index}
            className="flex flex-col sm:flex-row justify-between items-center pt-3"
          >
            <div className="text-center sm:text-left">
              <h3 className="font-semibold">{member.id.name}</h3>
            </div>
            <div className="flex items-center justify-center sm:justify-start mt-2 sm:mt-0">
              <span className="ml-4">{member.role}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamMembers;