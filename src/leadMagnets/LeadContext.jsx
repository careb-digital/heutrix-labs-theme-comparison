import React, {createContext, useContext, useState} from 'react';
const Context = createContext(null);
// Memory only: never persist contact details or assessment answers in browser storage.
export function LeadProvider({children}) {
  const [assessment, setAssessment] = useState(null);
  return <Context.Provider value={{assessment, setAssessment}}>{children}</Context.Provider>;
}
export const useLeadContext = () => useContext(Context);
