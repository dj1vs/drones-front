import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter} from 'react-router-dom'
import { Routes, Route } from 'react-router-dom';

import RegionsPage from './RegionsPage'
import RegionPage from './RegionPage'
import FlightsPage from './FlightsPage'
import Navigation from './components/Navigation'
import Breadcrumbs from './components/Breadcrumbs';
import AuthPage from './AuthPage';
import store from './store/store';


import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import AccountPage from './AccountPage';
import BookPage from './BookPage';
import FlightPage from './FlightPage';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Navigation />
        <Breadcrumbs />
        <Routes>
          <Route path="/drones-front/flights" Component={FlightsPage} />
          <Route path="/drones-front" Component={RegionsPage} />
          <Route path="/drones-front/region" Component={RegionPage} />
          <Route path="/drones-front/auth" Component={AuthPage} />
          <Route path="/drones-front/account" Component={AccountPage} />
          <Route path="/drones-front/book" Component={BookPage} />
          <Route path="/drones-front/flight" Component={FlightPage} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
)