import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

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
            <p>Dashboard</p>
            <button className="nes-btn" onClick={handleLogout}>Logout</button>
        </div>
            

    )
}

export default Dashboard;