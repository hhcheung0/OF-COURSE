import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from './images/lcsdlogo.jpg';
import Title from "./index";
import bcrypt from 'bcryptjs'

const Login = () => {
    localStorage.setItem("authenticated", false);
    const [username, setusername] = useState("");
    const [password, setpassword] = useState("");
    const navigate = useNavigate();

    const [errorMessages, setErrorMessages] = useState({});

    // User login error msg
    const errors = {
        loginerror: "Invalid username or password. Please try again.",
        username: "Invalid username",
        password: "Invalid password"
    };

    useEffect(() => {
        checkCookie();
    }, [])

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

    function checkCookie() {
        //console.log(document.cookie);
        let user = getCookie("user");
        if (user != "") {
            navigate("/dashboard");
        }
    }

    function setCookie(user) {
        const d = new Date();
        d.setTime(d.getTime() + (15 * 60 * 1000)); //5 min
        let expires = "expires="+d.toUTCString();
        document.cookie = "user=" + user + ";" + expires + ";path=/";
        //console.log(document.cookie);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        
        fetch('/login', {
            method: 'POST',
            headers: {'Content-type' : 'application/json'},
            body: JSON.stringify({name : username})
        })
        .then(res => {
            return res.text();
        })
        .then(data => {          
            if (bcrypt.compareSync(password, data)) {
                setCookie(username);
                navigate("/loadAPI");
            }else{
                localStorage.setItem("authenticated", false);
                setErrorMessages({ name: "loginerror", message: errors.loginerror });
            };
        })
    };

    const renderErrorMessage = (name) => name === errorMessages.name && (
          <div className="login-error">{errorMessages.message}</div>
    );

    return(
        <div className="h-100">
            <Title/>
            <div className="App">
                <div className="container p-3 loginbox">
                    <div className="row p-2">
                        <form className="form" onSubmit={handleSubmit}>
                            <img src={logo} alt="Logo" width="30%" />
                            <div className="username p-2 d-flex justify-content-center">
                                <label htmlFor="Username" className="p-2"><b>Username:</b></label>
                                <input type="text" placeholder="Enter Username" name="Username" id="Username" onChange={(e) => setusername(e.target.value)} required></input>
                            </div>
                            <div className="pwd p-2 d-flex justify-content-center">
                                <label htmlFor="psw" className="p-2"><b>Password:</b></label>
                                <input type="password" placeholder="Enter Password" name="Password" id="Password" onChange={(e) => setpassword(e.target.value)} required></input>
                            </div>
                            <div className="p-2 d-flex justify-content-center">
                                <input className="submit" type="submit" value="Submit" />
                            </div>
                            {renderErrorMessage("loginerror")}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;
