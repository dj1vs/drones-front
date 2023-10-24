import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider} from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.min.css';

import RegionsPage from './RegionsPage'
import RegionPage from './RegionPage'

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
      <div>
        <h1> Заявки контроля маршрута БПЛА </h1>
      </div>
    <RouterProvider router={router} />
  </React.StrictMode>,
)