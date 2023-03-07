import React, { useState } from "react";
//import { useNavigate } from "react-router-dom";

const Signup = () => {
    const [Username, setUsername] = useState('');
    const [Password, setPassword] = useState('');
    const [Confirmpassword, setConfirmpassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!e.target.Username.value) {
            alert("Username is required");
        } else if (!e.target.Password.value) {
            alert("Password is required");
        }
        // We actually don't need this because it is labled "required" in lines 44, 49, and 54, right? (If so, please help me erase!)
        if (e.target.Password.value !== e.target.Confirmpassword.value) {
          alert("Passwords do not match!");
          return;
        }

        fetch('/signup', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                Username, Password 
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
                    <label name="Username"><b>Username </b></label>
                    <input type="text" placeholder="Enter your username" name="Username" value={Username} onChange={(e) => setUsername(e.target.value)} required />
                    
                    <br /><br />

                    <label name="Password"><b>Password </b></label>
                    <input type="password" placeholder="Enter your password" name="Password" value={Password} onChange={(e) => setPassword(e.target.value)} required />
                     
                    <br /><br />

                    <label name="Confirmpassword"><b>Confirm Password </b></label>
                    <input type="password" placeholder="Enter your password again" name="Confirmpassword" value={Confirmpassword} onChange={(e) => setConfirmpassword(e.target.value)} required />

                    <br /><br />
                    
                    <button type="submit">Signup</button>
                    <p>Already have an account? <a href="/login">Login here</a></p>   
                </form>
            </div>


        </div>
    )

}

export default Signup;