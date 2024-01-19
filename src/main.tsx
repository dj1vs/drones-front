import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter} from 'react-router-dom'
import { Routes, Route } from 'react-router-dom';

import RegionsPage from './RegionsPage'
import RegisterPage from './RegisterPage';
import RegionPage from './RegionPage'
import FlightsPage from './FlightsPage'
import Navigation from './components/Navigation'
import Breadcrumbs from './components/Breadcrumbs';
import AuthPage from './AuthPage';
import store from './store/store';
import ModRegionsPage from './ModRegionsPage';


import 'bootstrap/dist/css/bootstrap.min.css';

import './index.css'

import { Provider } from 'react-redux';
import FlightPage from './FlightPage';
import BookPage from './BookPage';
import FlightEditPage from './FlightEditPage';
import RegionEditPage from './RegionEditPage';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Navigation />
        <Breadcrumbs />
        <Routes>
          <Route path="/drones-front/flights" Component={FlightsPage} />
          <Route path="/drones-front" Component={RegionsPage} />
          <Route path="/drones-front/mod_regions" Component={ModRegionsPage} />
          <Route path="/drones-front/region" Component={RegionPage} />
          <Route path="/drones-front/flight" Component={FlightPage} />
          <Route path="/drones-front/auth" Component={AuthPage} />
          <Route path="/drones-front/register" Component={RegisterPage} />
          <Route path="/drones-front/book" Component={BookPage} />
          <Route path="/drones-front/flight_edit" Component={FlightEditPage} />
          <Route path="/drones-front/region_edit" Component={RegionEditPage} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
)