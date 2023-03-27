import React, { useState } from "react";

const User = () => {
    return (
        <div id='user' className="row">
            <b>My Profile</b>
            <div>Username: Username</div>
        </div>
    );
}

const Password = () => {
    const [currentPW, setCurrentPW] = useState("");
    const [newPW, setNewPW] = useState("");
    const [confirmPW, setConfirmPW] = useState("");

    const changePassword = (e) => {

    };

    return (
        <div id="change-pw" className="row">
            <b className="d-flex justify-content-center">Change Password</b>
            <form onSubmit={changePassword}>
                    <label name="currentPW">Current Password:</label>
                    <br />
                    <input type="text" name="currentPW" value={currentPW} onChange={(e) => setCurrentPW(e.target.value)} required />
                    
                    <br /><br />

                    <label name="newPW">New Password:</label>
                    <br />
                    <input type="text" name="newPW" value={newPW} onChange={(e) => setNewPW(e.target.value)} required />

                    <br /><br />

                    <label name="confirmPW">Confirm Password:</label>
                    <br />
                    <input type="text" name="confirmPW" value={confirmPW} onChange={(e) => setConfirmPW(e.target.value)} required />

                    <br /><br />
                    
                    <button type="submit">Save</button>
                </form>
        </div>
    )
}

const Icon = () => {
    return (
        <div id="change-icon" className="row">
            <b className="d-flex justify-content-center">Change Profile Picture</b>
            <div className="d-flex justify-content-center">
                <img id="current-icon" src="/nekko.jpg" alt="" />
            </div>
            <div id="select-icon">
                <div className="d-flex justify-content-center">
                    <img id="icon-1" src="/nekko.jpg" alt="" />
                    <img id="icon-2" src="/nekko.jpg" alt="" />
                    <img id="icon-3" src="/nekko.jpg" alt="" />
                    <img id="icon-4" src="/nekko.jpg" alt="" />
                    <img id="icon-5" src="/nekko.jpg" alt="" />
                </div>
                <div className="d-flex justify-content-center">
                    <img id="icon-6" src="/nekko.jpg" alt="" />
                    <img id="icon-7" src="/nekko.jpg" alt="" />
                    <img id="icon-8" src="/nekko.jpg" alt="" />
                    <img id="icon-9" src="/nekko.jpg" alt="" />
                    <img id="icon-10" src="/nekko.jpg" alt="" />
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