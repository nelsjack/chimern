import { STEAK } from "../constants/dashboard"

function ActionContainer() {
    return (
        <div className="action-container">
            <button className="nes-btn feed-btn">
                <img className="steak" src={STEAK} alt="steak"/>
                Feed
            </button>
        </div>
    )
}

export default ActionContainer;