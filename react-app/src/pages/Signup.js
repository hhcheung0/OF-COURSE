import React, { useState } from "react";
import { Link } from "react-router-dom";

const Signup = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // if (!username) {
        //     alert("Username is required");
        // } else if (!password) {
        //     alert("Password is required");
        // }
        if (password !== confirmPassword) {
          alert("Passwords do not match!");
          return;
        }

        fetch('http://localhost:3001/signup', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({username, password})
        })
        .then(res => res.json())
        .then(json => console.log(json))
        .catch(err => console.error(err));
    };
    // need to create a condition - 
    // if (user === null) -> signup
    // else -> find the user with the name (username) and return "The user already exists"

    return(
        <div>
            <h2>Signup Page</h2>
            <div className="container">
                <form onSubmit={handleSubmit}>
                    <label name="username"><b>Username </b></label>
                    <input type="text" placeholder="Enter your username" name="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                    
                    <br /><br />

                    <label name="password"><b>Password </b></label>
                    <input type="password" placeholder="Enter your password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                     
                    <br /><br />

                    <label name="confirmPassword"><b>Confirm Password </b></label>
                    <input type="password" placeholder="Enter your password again" name="confirmpassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />

                    <br /><br />
                    
                    <button type="submit">Signup</button>
                    <p>Already have an account? <Link to="/login">Login here</Link></p>   
                </form>
            </div>
        </div>
    )

}

export default Signup;