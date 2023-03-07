import React, { useState } from "react";
//import { useNavigate } from "react-router-dom";

const Login = () => {
    const [Username, setUsername] = useState("");
    const [Password, setPassword] = useState("");
    
    //const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!e.target.Username.value) {
            alert("Username is required");
        } else if (!e.target.Password.value) {
            alert("Password is required");
        }
        // We actually don't need this because it is labled "required" in lines 44, 49, and 54, right? (If so, please help me erase!)
        
        fetch('/login', {
            method: 'POST',
            headers: {'Content-type' : 'application/json'},
            body: JSON.stringify({
                Username: Username,
                Password: Password
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
    // if (user === null) -> The user is not found
    // if the password is not correct -> The password is incorrect


    return(
        <div>
            <h2>Login Page</h2>
            <div className="container">
                <form onSubmit={handleSubmit}>
                    <label name="Username"><b>Username </b></label>
                    <input type="text" placeholder="Enter your username" name="Username" value={Username} onChange={(e) => setUsername(e.target.value)} required />
                    
                    <br /><br />

                    <label name="Password"><b>Password </b></label>
                    <input type="password" placeholder="Enter your password" name="Password" value={Password} onChange={(e) => setPassword(e.target.value)} required />

                    <br /><br />
                    
                    <button type="submit">Login</button>
                    <p>Not registered? <a href="/signup">Create an account</a></p>   
                </form>
            </div>


        </div>
    )
}

export default Login;
