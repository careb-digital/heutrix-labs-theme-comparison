import './fonts.css';
import {LeadProvider} from './leadMagnets/LeadContext';
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

const root = document.getElementById('root');
const application = (
  <React.StrictMode>
    <LeadProvider><App /></LeadProvider>
  </React.StrictMode>
);
if (root.hasChildNodes()) ReactDOM.hydrateRoot(root, application);
else ReactDOM.createRoot(root).render(application);

import './refined.css';
import './leadMagnets/leadMagnets.css';

import './original-theme.css';
