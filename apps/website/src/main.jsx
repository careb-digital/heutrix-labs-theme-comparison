import './fonts.css';
import {LeadProvider} from './leadMagnets/LeadContext';
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <LeadProvider><App /></LeadProvider>
  </React.StrictMode>,
)

import './refined.css';
import './leadMagnets/leadMagnets.css';

import './original-theme.css';
