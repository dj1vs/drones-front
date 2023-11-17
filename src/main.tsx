import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter} from 'react-router-dom'
import { Routes, Route } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';

import RegionsPage from './RegionsPage'
import RegionPage from './RegionPage'
import Navigation from './components/Navigation'
import Breadcrumbs from './components/Breadcrumbs';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter basename='/drones-front'>
      <Navigation />
      <Breadcrumbs />
      <Routes>
        <Route path="/drones-front" Component={RegionsPage} />
        <Route path="/drones-front/region" Component={RegionPage} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)