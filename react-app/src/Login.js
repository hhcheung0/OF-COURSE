import React, { useState } from "react";
//import { useNavigate } from "react-router-dom";

const Login = () => {
    const [name, setname] = useState("");
    const [password, setPassword] = useState("");
    
    //const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        
        fetch('/login', {
            method: 'POST',
            headers: {'Content-type' : 'application/json'},
            body: JSON.stringify({
                name : name,
                password: password
             })
        })
        .then(res => {
            if(res.ok){
                console.log("Login successful");
            }else{
                console.error(res.statusText);
            }
        })
        .catch(error => console.log(error));
    };

    return(
        <div>
            <h2>Login Page</h2>
            <div className="container">
                <form onSubmit={handleSubmit}>
                    <label name="name"><b>Username </b></label>
                    <input type="text" placeholder="Enter your username" name="name" value={name} onChange={(e) => setname(e.target.value)} required />
                    
                    <br /><br />

                    <label name="password"><b>Password </b></label>
                    <input type="password" placeholder="Enter your password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required />

                    <br /><br />
                    
                    <button type="submit">Login</button>
                    <p>Not registered? <a href="/">Create an account</a></p>   
                </form>
            </div>


        </div>
    )
}

export default Login;
