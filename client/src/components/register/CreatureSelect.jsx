import { CREATURES } from "../constants/creatures";


function CreatureSelect({setCreature, displayFlavorText}) {

    return (
        <div className="creature-select-container">
            <div className="creature-btn-container">
                {CREATURES.map(creature => {
                    return (
                        <button className="nes-btn creature-btn" key={creature.name} onClick={() => setCreature(creature.name)}>
                            <img className="creature-sprite" src={creature.image} alt={creature.name}/>
                        </button>
                    )   
                })}
            </div>
            <p className="flavor-text">{displayFlavorText()}</p>
        </div>
    )
}

export default CreatureSelect;