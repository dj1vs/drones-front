import React from 'react'
import ReactDOM from 'react-dom/client'

import { createBrowserRouter, RouterProvider} from 'react-router-dom'
import './index.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: <h1> This is our start page</h1>
  },
  {
    path: '/new',
    element: <h1> This is our page with something new</h1>
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ul>
      <li>
        <a href="/">Старт</a>
      </li>
      <li>
        <a href="/new">Хочу на страницу с чем-то новеньким</a>
      </li>
    </ul>
    <hr />
    <RouterProvider router = {router} />
  </React.StrictMode>,
)
