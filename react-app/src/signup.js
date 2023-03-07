import React, { useState } from "react";
//import { useNavigate } from "react-router-dom";

const Signup = () => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmpassword, setConfirmpassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!e.target.name.value) {
            alert("Username is required");
        } else if (!e.target.password.value) {
            alert("Password is required");
        }
        if (e.target.password.value !== e.target.confirmpassword.value) {
          alert("Passwords do not match!");
          return;
        }

        fetch('/signup', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                name, password 
            })
        })
        .then(res => console.log(res))
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
                    <label name="name"><b>Username </b></label>
                    <input type="text" placeholder="Enter your username" name="name" value={name} onChange={(e) => setName(e.target.value)} required />
                    
                    <br /><br />

                    <label name="password"><b>Password </b></label>
                    <input type="password" placeholder="Enter your password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                     
                    <br /><br />

                    <label name="password"><b>Confirm Password </b></label>
                    <input type="password" placeholder="Enter your password again" name="confirmpassword" value={confirmpassword} onChange={(e) => setConfirmpassword(e.target.value)} required />

                    <br /><br />
                    
                    <button type="submit">Signup</button>
                    <p>Already have an account? <a href="/login">Login here</a></p>   
                </form>
            </div>


        </div>
    )

}

export default Signup;