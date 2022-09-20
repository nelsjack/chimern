import { STEAK, SOAP, BALL } from "../constants/dashboard"

function ActionContainer({setHunger, setMood, setCleanliness}) {

    async function handleClick(type) {
        const body = {type: type}
        await fetch("http://localhost:3333/updateValue", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                "x-access-token": localStorage.getItem("token")
            },
            body: JSON.stringify(body)
        }).then(res => res.json())
            .then(data => {
                if (type === "hunger") {setHunger(data)}
                if (type === "mood") {setMood(data)}
                if (type === "cleanliness") {setCleanliness(data)}
            })
    }
    
    return (
        <div className="action-container">
            <button className="nes-btn feed-btn" onClick={() => handleClick("hunger")}>
                <img className="steak" src={STEAK} alt="feed"/> Feed
            </button>
            <button className="nes-btn feed-btn" onClick={() => handleClick("mood")}>
                <img className="ball" src={BALL} alt="play"/> Play
            </button>
            <button className="nes-btn feed-btn" onClick={() => handleClick("cleanliness")}>
                <img className="soap" src={SOAP} alt="clean"/> Clean
            </button>
        </div>
    )
}

export default ActionContainer;