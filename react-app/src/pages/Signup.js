import React, { useState } from "react";
import { Link } from "react-router-dom";

const Signup = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

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
        .then(json => {
            if(json.message === 'User already exists!'){
                setErrorMessage(json.message);
            }else{
                console.log(json);
                setErrorMessage('');
            }
        })
        .catch(err => console.error(err));
    };
    // need to create a condition - 
    // if (user === null) -> signup
    // else -> find the user with the name (username) and return "The user already exists"


    // check password matching
    return(
        <>
            <h2>Signup Page</h2>
            {errorMessage && <div style={{color: 'red'}}>{errorMessage}</div>}
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
        </>
    )

}

export default Signup;