import React, { useState, useEffect } from "react"
import useEnroll from '../hooks/useEnroll';
import useComment from '../hooks/useComment';
import useUser from '../hooks/useUser'

const Osborn = () => {
    const { addToCart, removeFromCart, enroll,drop, swap, getEnrolledCredit, getCompletedCredit} = useEnroll()
    const { removeComment} = useComment();
    const { getUserByToken } = useUser()

    return(
        <div id="login">
            <div className="container">
                <button onClick={() => addToCart("MUSC2340")}>Add</button>
                <button onClick={() => removeFromCart("MGNT3690")}>Remove</button>
                <button onClick={() => enroll("ARCH1290","T01")}>Enroll</button>
                <button onClick={() => drop("MGNT3690", "T01")}>Drop</button>
                <button onClick={() => swap("ARCH1290", "T01", "ARCH1290","T02")}>Swap</button>
                <button onClick={() => removeComment("HIST1890","Testing")}>Remove Comment</button>
                <button onClick={() => getEnrolledCredit()}>Get enrolled credit</button>
                <button onClick={() => getCompletedCredit()}>Get completed credit</button>
            </div>
        </div>
    )
}

export default Osborn;