import { CREATURES } from "../constants/creatures"

function Playground({userCreature}) {
    return (
        <div className="playground-container">
            <div className="creature-container">
                {CREATURES.map(creature => {
                    if (userCreature === creature.name) {
                        //console.log(creature.image)
                        return (
                            <img className="creature" src={creature.image} alt="creature"/>
                        )
                    } else return null;
                })}
            </div>
        </div>
    )
}

export default Playground;