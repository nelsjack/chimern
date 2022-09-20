import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { BACKDROP } from '../constants/dashboard.js'
import HealthContainer from './HealthContainer'
import Playground from './Playground'
import ActionContainer from './ActionContainer'
import StatusBars from './StatusBars'
import "../styles/Dashboard.css"

function Dashboard() {
    const [userCreature, setUserCreature] = useState("");
    const [hunger, setHunger] = useState(0);
    const [mood, setMood] = useState(0);
    const [cleanliness, setCleanliness] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        fetch("http://localhost:3333/checkUserAuth", {
            headers: {
                "x-access-token": localStorage.getItem("token")
            }
        })
        .then(res => res.json())
        .then(data => {
            if(!data.isLoggedIn) {
                console.log('User not logged in, redirecting to login page')
                navigate("/login")
            }
        })
        getCreatureInfo();
    }, [])

    function getCreatureInfo() {
        fetch("http://localhost:3333/dashboard", {
            headers: {
                "x-access-token": localStorage.getItem("token")
            }
        })
        .then(res => res.json())
        .then(data => {
            if (data.creature) {
                const creature = data.creature[0]
                setUserCreature(creature.name)
                setHunger(creature.hunger)
                setMood(creature.mood)
                setCleanliness(creature.cleanliness)
            }
        })
    }

    function handleLogout() {
        localStorage.removeItem("token")
        navigate("/login")
    }

    return (
        <div className="dashboard-container">
            <img className="backdrop" src={BACKDROP.image} alt="backdrop"/>
            <HealthContainer/>
            <StatusBars hunger={hunger} mood={mood} cleanliness={cleanliness}/>
            <Playground userCreature={userCreature}/>
            <ActionContainer getCreatureInfo={getCreatureInfo}/>
            <button className="nes-btn logout-btn" onClick={handleLogout}>Logout</button>
        </div>
            

    )
}

export default Dashboard;