import { MONGOAT_HEAD } from "../constants/creatures";

function HealthContainer() {
    return (
        <div className="health-container">
            <img className="creature-head-icon" src={MONGOAT_HEAD.image} alt="icon"/>
            <div className="health-bar">
                <i className="nes-icon is-large heart"></i>
                <i className="nes-icon is-large is-half heart"></i>
                <i className="nes-icon is-large is-transparent heart"></i>
            </div>
        </div>
    )
}

export default HealthContainer;