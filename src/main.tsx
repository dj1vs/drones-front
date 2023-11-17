import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider} from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.min.css';

import RegionsPage from './RegionsPage'
import RegionPage from './RegionPage'
import Navigation from './components/Navigation'
import Breadcrumbs from './components/Breadcrumbs';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RegionsPage />
  },
  {
    path: '/region',
    element: <RegionPage />
  }
])


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Navigation />
    <Breadcrumbs />
    <RouterProvider router={router} />
  </React.StrictMode>,
)