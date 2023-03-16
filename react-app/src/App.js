import React from 'react'
import './index.scss'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'

// import components
import Root from './components/Root'

// import pages
import Login from './pages/Login'
import Signup from './pages/Signup'

const router = createBrowserRouter([
  {
    path: '',
    element: <Root nav={true} />,
    children: [
      {
        path: '/',
        element: <div>empty</div>
      }
    ]

  },
  {
    path: '',
    element: <Root nav={false} />,
    children: [
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/signup',
        element: <Signup />
      }
    ]
  }
])

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
