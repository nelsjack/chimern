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

    return (
        <p>Dashboard</p>
    )
}

export default Dashboard;