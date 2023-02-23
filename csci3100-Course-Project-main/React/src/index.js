/*
CSCI2720 Group Project Group 5

Group Members:
Chan Tsz Leung (1155127714)
Cheung Hin Hang (1155144254)
Choi Ching Ying (1155108224)
Ng Chun Ying (1155144678) 
Sze Nok Yi Victoria (1155159562)
Yan Hiu Wun (1155142739)
*/


import React from 'react';
import ReactDOM from "react-dom/client";
import {BrowserRouter,  Routes,  Route, useNavigate} from 'react-router-dom';
import './css/style.css';
import Login from "./Login";
import Loading from "./Loading";
import Dashboard from "./Dashboard";
import Detail from './detail';
import UserPage from './UserPage';
import Users from './users';

const Title = () =>{
  const navigate = useNavigate();
  
  function getCookie(cname) {
    let name = cname + "=";
    let ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

  function loginNout() {
    document.cookie = "user=;expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "update=;expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    navigate("/");
  }

  function user() {
    navigate("/userPage");
  }

  return (
    <header className="user-header p-2">
      <div className="row flex-nowrap justify-content-between align-items-center">
        <div className="col-4 pt-1">
            <h3 className="display-4 text-center">CSCI2720 Group Project</h3>
          </div>
          <div className="col-5 pt-1">
          {getCookie("update")? <span className="last-update">Late update:<br /> {getCookie("update")}</span> : <></>}
        </div>
        <div className="col-3">
          <div className="row">
            <div className="col-12">
              {getCookie("user")? <span onClick={user} className="btn text-center">User: {getCookie("user")}</span> : <></>}
              {getCookie("user") == "" ? <></> : <span className="btn" onClick={loginNout}>Logout</span>}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Title;


class App extends React.Component {
    render() {
      return (
          <BrowserRouter>
              <Routes>
                  <Route path="/" element={<Login />}/>
                  <Route path="/loadAPI" element={<Loading />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/detail" element={<Detail />} />
                  <Route path="/userPage" element={<UserPage />} />
                  <Route path="/users" element={<Users />} />
                  <Route path="/*" element={<Login />} />
              </Routes>
          </BrowserRouter>
      );
    }
}

const root = ReactDOM.createRoot(document.querySelector('#app'));
root.render(<App/>);