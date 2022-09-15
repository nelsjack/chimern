import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { BACKDROP } from '../constants/dashboard.js'
import HealthContainer from './HealthContainer'
import Playground from './Playground'
import ActionContainer from './ActionContainer'
import "../styles/Dashboard.css"

function Dashboard() {
    const navigate = useNavigate()

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
    })

    function handleLogout() {
        localStorage.removeItem("token")
        navigate("/login")
    }

    return (
        <div className="dashboard-container">
            <img className="backdrop" src={BACKDROP.image} alt="backdrop"/>
            <HealthContainer/>
            <Playground/>
            <ActionContainer/>
            <button className="nes-btn logout-btn" onClick={handleLogout}>Logout</button>
        </div>
            

    )
}

export default Dashboard;