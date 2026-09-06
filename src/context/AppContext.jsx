import React, { createContext, useContext, useState, useEffect } from 'react';
import { expertService } from '../services/expertService';
import { institutionService } from '../services/institutionService';
import { enquiryService } from '../services/enquiryService';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [experts, setExperts] = useState([]);
  const [institutions, setInstitutions] = useState([]);
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  const refreshData = async () => {
    setLoading(true);
    const [exp, inst, enq] = await Promise.all([
      expertService.getExperts(),
      institutionService.getInstitutions(),
      enquiryService.getEnquiries()
    ]);
    setExperts(exp);
    setInstitutions(inst);
    setEnquiries(enq);
    setLoading(false);
  };

  useEffect(() => {
    refreshData();
  }, []);

  return (
    <AppContext.Provider value={{ experts, institutions, enquiries, refreshData, loading }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);