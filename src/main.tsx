import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider} from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.min.css';

import RegionsPage from './RegionsPage'
import RegionPage from './RegionPage'
import NavigationPage from './NavigationPage'
import BreadcrumbPage from './BreadcrumbPage';

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
    <NavigationPage />
    <BreadcrumbPage />
    <RouterProvider router={router} />
  </React.StrictMode>,
)