import { CREATURES } from "../constants/creatures"

function Playground({userCreature}) {
    return (
        <div className="playground-container">
            <div className="creature-container">
                {CREATURES.map(creature => {
                    if (userCreature === creature.name) {
                        return (
                            <img className="creature" src={creature.image} key={creature} alt="creature"/>
                        )
                    } else return null;
                })}
            </div>
        </div>
    )
}

export default Playground;