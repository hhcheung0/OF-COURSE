import React from 'react';
import './index.scss';
import {BrowserRouter,  Routes,  Route} from 'react-router-dom';
import Login from './Login';

function App() {
  return (
    <BrowserRouter>
          <Routes>
              <Route path="/login" element={<Login />}/>
          </Routes>
      </BrowserRouter>
  );
}

export default App;
