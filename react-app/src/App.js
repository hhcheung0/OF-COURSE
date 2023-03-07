import React from 'react'
import './index.scss'
import {BrowserRouter,  Routes,  Route} from 'react-router-dom'

// import pages
import Login from './pages/Login'
import Signup from './pages/Signup'

function App() {
  return (
    <BrowserRouter>
          <Routes>
              <Route path="/login" element={<Login />}/>
              <Route path="/signup" element={<Signup />}/>
          </Routes>
      </BrowserRouter>
  );
}

export default App;
