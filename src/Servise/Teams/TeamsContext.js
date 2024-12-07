import React, { createContext, useContext, useEffect, useState } from 'react';
import TeamsService from './TeamsService';

const TeamsContext = createContext();
const useTeamsContext = () => useContext(TeamsContext);

const TeamsProvider = ({ children }) => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchTeamsData = async () => {
    const fetchedTeams = await TeamsService.fetchTeams('your_club_token', 123);
    setTeams(fetchedTeams);
    setLoading(false);
  };
  useEffect(() => {
    

    fetchTeamsData();
  }, []);

  return (
    <TeamsContext.Provider value={{ teams, loading,fetchTeamsData }}>
      {children}
    </TeamsContext.Provider>
  );
};

export { TeamsProvider, useTeamsContext };
