import React from 'react'
import ReactDOM from 'react-dom/client'
import MainPage from '@/components/App'
import { GlobalContext } from '../contexts/GlobalContext';
import { ToastContainer } from 'react-toastify';

import './main.css'
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <GlobalContext>
      <MainPage />
      <ToastContainer />
    </GlobalContext>
  </React.StrictMode >
)
