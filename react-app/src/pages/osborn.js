import useEnroll from '../hooks/useEnroll';
import useComment from '../hooks/useComment';

const Osborn = () => {
    const { addToCart, removeFromCart, enroll,drop, swap} = useEnroll()
    const { removeComment} = useComment();
    return(
        <div id="login">
            <div className="container">
                <button onClick={() => addToCart("MUSC2340")}>Add</button>
                <button onClick={() => removeFromCart("MGNT3690")}>Remove</button>
                <button onClick={() => enroll("ARCH1290","T01")}>Enroll</button>
                <button onClick={() => drop("MGNT3690", "T01")}>Drop</button>
                <button onClick={() => swap("ARCH1290", "T01", "ARCH1290","T02")}>Swap</button>
                <button onClick={() => removeComment("HIST1890","Testing")}>Remove Comment</button>
            </div>
        </div>
    )
}

export default Osborn;