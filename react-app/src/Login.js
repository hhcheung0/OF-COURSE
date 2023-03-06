import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessages, setErrorMessages] = useState({});
    const navigate = useNavigate();

    // User login error msg
    const errors = {
        loginerror: "Invalid username or password. Please try again.",
        username: "Invalid username",
        password: "Invalid password"
    };

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
            if (password === data) {
                navigate("/");
            }else{
                setErrorMessages({ name: "loginerror", message: errors.loginerror });
            };
        })
    };

    const renderErrorMessage = (name) => name === errorMessages.name && (
        <div className="login-error">{errorMessages.message}</div>
  );

    return(
        <div>
            <h2>Login Page</h2>
            <div className="container">
                <form onSubmit={handleSubmit}>
                    <label name="username"><b>Username </b></label>
                    <input type="text" placeholder="Enter your username" name="username" onChange={(e) => setUsername(e.target.value)} required />
                    
                    <br /><br />

                    <label name="password"><b>Password </b></label>
                    <input type="password" placeholder="Enter your password" name="password" onChange={(e) => setPassword(e.target.value)} required />

                    <br /><br />
                    
                    <button type="submit">Login</button>
                    <p>Not registered? <a href="/">Create an account</a></p>   
                    {renderErrorMessage("loginerror")}
                </form>
            </div>


        </div>
    )
}

export default Login;
