import React from 'react'
import './index.scss'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'

// import components
import Root from './components/Root'

// import pages
import Login from './pages/Login'
import Signup from './pages/Signup'
import CourseInfo from './pages/CourseInfo'
import CourseBrowsing from './pages/CourseBrowsing'
import Home from './pages/Home'
import Profile from './pages/Profile'
import Admin from './pages/Admin'

const router = createBrowserRouter([
  {
    path: '',
    element: <Root nav={true} />,
    children: [
      {
        path: '/',
        element: <div>empty</div>
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
        path: '/home',
        element: <Home />
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
