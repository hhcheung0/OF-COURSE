import React from 'react'
import './index.scss'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

// import components
import Root from './components/Root'

// import pages
import Login from './pages/Login'
import Signup from './pages/Signup'
import CourseInfo from './pages/CourseInfo'
import CourseBrowsing from './pages/CourseBrowsing'
import Homepage from './pages/Homepage'
import Profile from './pages/Profile'
import Admin from './pages/Admin'
import Osborn from './pages/osborn'

const router = createBrowserRouter([
  {
    path: '',
    element: <Root nav={true} />,
    children: [
      {
        path: '/',
        element: <Homepage />
      },
      {
        path: '/course',
        element: <CourseBrowsing />
      },
      {
        path: '/course/:courseID',
        element: <CourseInfo />
      },
      {
        path: '/profile',
        element: <Profile />
      },
      {
        path: '/admin',
        element: <Admin />
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
      },

    ]
  },
])

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
