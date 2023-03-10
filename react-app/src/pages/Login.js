import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// import Hello from '../components/Hello'

// const userSchema = mongoose.Schema({
//     userID: { type: Number, required: true, unique: true },
//     username: { type: String, required: true, unique: true },
//     password: { type: String, required: true },
//     accessRight: { type: Boolean, required: true },
//     maxCredit: { type: Number },
//     enrolledCourseID: { type: Array },
//     passedCourseID: { type: Array },
//     shoppingCartCourseID: { type: Array }
//   });

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    
    //const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // if (username === null){
        //     console.log("User is not found");
        // }

        fetch('http://localhost:3001/login', {
            method: 'POST',
            headers: {'Content-type' : 'application/json'},
            body: JSON.stringify({
                username: username,
                password: password
            })
        })
        .then(res => res.json())
        .then(json => {
            if(json.message === 'User already exists!'){
                setErrorMessage(json.message);
            }else{
                console.log(json);
                // window.location.href = "/";
                navigate("/");
                setErrorMessage('');
            }
        })
        // .then(res => {
        //     if(res.ok){
        //         console.log("Login successful");
        //     }else{
        //         console.error(res.statusText);
        //     }
        // })
        .catch(error => console.log(error));
    };
    // if (user === null) -> The user is not found
    // if the password is not correct -> The password is incorrect


    return(
        <div>
            <h2>Login Page</h2>
            {/* <Hello /> */}
            {errorMessage && <div style={{color: 'red'}}>{errorMessage}</div>}
            <div className="container">
                <form onSubmit={handleSubmit}>
                    <label name="username"><b>Username </b></label>
                    <input type="text" placeholder="Enter your username" name="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                    
                    <br /><br />

                    <label name="password"><b>Password </b></label>
                    <input type="password" placeholder="Enter your password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required />

                    <br /><br />
                    
                    <button type="submit">Login</button>
                    <p>Not registered? <Link to="/signup">Create an account</Link></p>
                </form>
            </div>


        </div>
    )
}

export default Login;
