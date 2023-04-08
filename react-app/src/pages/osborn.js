import useEnroll from '../hooks/useEnroll';

const Osborn = () => {
    const { addToCart, removeFromCart, enroll,drop, swap} = useEnroll()

    return(
        <div id="login">
            <div className="container">
                <button onClick={() => addToCart("MUSC2340")}>Add</button>
                <button onClick={() => removeFromCart("MGNT3690")}>Remove</button>
                <button onClick={() => enroll("MUSC2340")}>Enroll</button>
                <button onClick={() => drop("MGNT3690", "T01")}>Drop</button>
                <button onClick={() => swap("ARCH2180", "T02", "MUSC2340")}>Swap</button>
            </div>
        </div>
    )
}

export default Osborn;