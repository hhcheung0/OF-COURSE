import React from 'react'
import './index.scss'
import {BrowserRouter,  Routes,  Route} from 'react-router-dom'
import Login from './Login'
import Signup from './signup'

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
