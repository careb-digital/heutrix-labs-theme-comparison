import React, {createContext, useContext, useRef, useState} from 'react';
const Context = createContext(null);
// Memory only: never persist contact details or assessment answers in browser storage.
export function LeadProvider({children}) {
  const enquiryDrafts = useRef({});
  const enquiryOutcomes = useRef({});
  const pendingEnquiries = useRef(new Set());
  const [draftRevision, setDraftRevision] = useState(0);
  const notifyDrafts = () => setDraftRevision(value => value + 1);
  const [assessment, setAssessment] = useState(null);
  const [drafts, setDrafts] = useState({});
  return <Context.Provider value={{enquiryOutcomes, enquiryDrafts, pendingEnquiries, draftRevision, notifyDrafts, assessment, setAssessment, drafts, setDrafts}}>{children}</Context.Provider>;
}
export const useLeadContext = () => useContext(Context);
