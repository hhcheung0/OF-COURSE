import useEnroll from '../hooks/useEnroll';

const Osborn = () => {
    const { addToCart, removeFromCart, enroll,drop} = useEnroll()

    return(
        <div id="login">
            <div className="container">
                <button onClick={() => addToCart("MGNT3690", "T01")}>Add</button>
                <button onClick={() => removeFromCart("MGNT3690")}>Remove</button>
                <button onClick={() => enroll("MGNT3690", "T01")}>Enroll</button>
                <button onClick={() => drop("MGNT3690", "T01")}>Drop</button>
            </div>
        </div>
    )
}

export default Osborn;