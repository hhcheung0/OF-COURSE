import { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom'

// import hooks
import useUser from '../hooks/useUser'

const User = () => {
    const [username, setUsername] = useState('')
    const { getUserByToken } = useUser()

    useEffect(() => {
        const { username } = getUserByToken()
        setUsername(username)
    }, [getUserByToken])

    return (
        <div id='user' className="row">
            <b>My Profile</b>
            <div>Username: {username}</div>
        </div>
    );
}

const Password = () => {
    const [username, setUsername] = useState('')
    const [currentPW, setCurrentPW] = useState("");
    const [newPW, setNewPW] = useState("");
    const [confirmPW, setConfirmPW] = useState("");
    const { getUserByToken } = useUser()
    const navigate = useNavigate()

    useEffect(() => {
        const { username } = getUserByToken()
        setUsername(username)
    }, [getUserByToken])

    const changePassword = (e) => {
        e.preventDefault();

        if (newPW !== confirmPW) {
          alert("Passwords do not match!");
          return;
        }

        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*+#?&])[A-Za-z\d@$!%*+#?&]{8,}$/;
        if (!passwordRegex.test(newPW)) {
            alert("Password must contain minimum eight characters, at least one letter, one number, and one special character");
            return;
        }

        fetch('http://localhost:3001/changePW', {
            method: 'PUT',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({username, currentPW, newPW})
        })
        .then(res => res.json())
        .then(json => {
            if(!json.success){
                alert(json.error);
            }else{
                alert(json.error);
                navigate(0)
            }
        })
        .catch(err => console.error(err));
    };

    return (
        <div id="change-pw" className="row">
            <b className="d-flex justify-content-center">Change Password</b>
            <form onSubmit={changePassword}>
                    <label name="currentPW">Current Password:</label>
                    <br />
                    <input type="password" name="currentPW" value={currentPW} onChange={(e) => setCurrentPW(e.target.value)} required />
                    
                    <br /><br />

                    <label name="newPW">New Password:</label>
                    <br />
                    <input type="password" name="newPW" value={newPW} onChange={(e) => setNewPW(e.target.value)} required />

                    <br /><br />

                    <label name="confirmPW">Confirm Password:</label>
                    <br />
                    <input type="password" name="confirmPW" value={confirmPW} onChange={(e) => setConfirmPW(e.target.value)} required />

                    <br /><br />
                    
                    <button type="submit">Save</button>
                </form>
        </div>
    )
}

const Icon = () => {
    const [iconFileName, setIconFileName] = useState('')
    const { getUserByToken } = useUser()
    const navigate = useNavigate()

    useEffect(() => {
        const { icon } = getUserByToken()
        switch(icon){
            case 1: setIconFileName("/nekko.jpg")
            break;
            case 2: setIconFileName("/bibi.jpg")
            break;
            case 3: setIconFileName("/slamdunk.gif")
            break;
            case 4: setIconFileName("/slamdunk2.jpeg")
            break;
            case 5: setIconFileName("/kenji.jpg")
            break;
            case 6: setIconFileName("/dragon.jpg")
            break;
            case 7: setIconFileName("/ghost.jpg")
            break;
            case 8: setIconFileName("/mushroom.jpg")
            break;
            case 9: setIconFileName("/turtle.jpg")
            break;
            case 10: setIconFileName("/kingkong.jpg")
            break;
        }
    }, [getUserByToken])

    

    const changeIcon = (index) => {
        fetch('http://localhost:3001/data/user/changeIcon', {
            method: 'PUT',
            credentials: 'include',
            headers: {'Content-type' : 'application/json'},
            body: JSON.stringify({
                icon: index
            })
        })
        .then(res => res.json())
        .then(json => {
            if(json.success){
                alert(json.error);
                navigate(0)
            }
        });
    };
    
    return (
        <div id="change-icon" className="row">
            <b className="d-flex justify-content-center">Change Profile Picture</b>
            <div className="d-flex justify-content-center">
                <img id="current-icon" src={iconFileName} alt="" />
            </div>
            <div id="select-icon">
                <div className="d-flex justify-content-center">
                    <img id="icon-1" src="/nekko.jpg" alt="" onClick={e => changeIcon(1)}/>
                    <img id="icon-2" src="/bibi.jpg" alt="" onClick={e => changeIcon(2)}/>
                    <img id="icon-3" src="/slamdunk.gif" alt="" onClick={e => changeIcon(3)}/>
                    <img id="icon-4" src="/slamdunk2.jpeg" alt="" onClick={e => changeIcon(4)}/>
                    <img id="icon-5" src="/kenji.jpg" alt="" onClick={e => changeIcon(5)}/>
                </div>
                <div className="d-flex justify-content-center">
                    <img id="icon-6" src="/dragon.jpg" alt="" onClick={e => changeIcon(6)}/>
                    <img id="icon-7" src="/ghost.jpg" alt="" onClick={e => changeIcon(7)}/>
                    <img id="icon-8" src="/mushroom.jpg" alt="" onClick={e => changeIcon(8)}/>
                    <img id="icon-9" src="/turtle.jpg" alt="" onClick={e => changeIcon(9)}/>
                    <img id="icon-10" src="/kingkong.jpg" alt="" onClick={e => changeIcon(10)}/>
                </div>
            </div>
        </div>
    )
}

const Profile = () => {
    return (
        <div id="profile">
            <div className="row">
                <User />
                <div className="col-8">
                    <Icon />
                </div>
                <div className="col-4">
                    <Password />
                </div>
            </div>
        </div>
    );
}

export default Profile;