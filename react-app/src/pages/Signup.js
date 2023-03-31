import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
          alert("Passwords do not match!");
          return;
        }

        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*+#?&])[A-Za-z\d@$!%*+#?&]{8,}$/;
        if (!passwordRegex.test(password)) {
            alert("Password must contain minimum eight characters, at least one letter, one number, and one special character");
            return;
        }

        // password restrictions (for creation/sign up):
        // ^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$
        // ^minimum eight characters, at least one letter, one number and one special character

        fetch('http://localhost:3001/signup', {
            method: 'POST',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({username, password})
        })
        .then(res => res.json())
        .then(json => {
            if(!json.success){
                setErrorMessage(json.error);
            }else{
                console.log(json);
                // window.location.href = "/login";
                navigate("/");
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
        <div id="signUp">
            <h2>Signup Page</h2>
            {errorMessage && <div style={{color: 'red'}}>{errorMessage}</div>}
            <div className="container">
                <form onSubmit={handleSubmit}>
                    <label name="username"><b>Username </b></label>
                    <input type="text" placeholder="Enter your username" name="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                    
                    <br /><br />

                    <label name="password"><b>Password </b></label>
                    {/* <p>Your password must contain minimum 8 characters, with at least 1 letter, 1 number, and 1 special character.</p> */}
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