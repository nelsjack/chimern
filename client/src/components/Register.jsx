import { useNavigate } from 'react-router'
import { useEffect } from 'react'

function Register() {
const navigate = useNavigate();

async function handleRegister(e) {
    e.preventDefault()
    const form = e.target;
    const user = {
        username: form[0].value,
        password: form[1].value
    }

    fetch("http://localhost:3333/register", {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(user)
    })
    .then(res => res.json())
    .then(data => {
        console.log('registration status: ', data)
        localStorage.setItem("token", data.token)
        checkUserAuth();
    })
}

useEffect(() => {
    checkUserAuth();
}, [])

    function checkUserAuth() {
        fetch("http://localhost:3333/checkUserAuth", {
        headers: {
            "x-access-token": localStorage.getItem("token")
        }
    })
    .then(res => res.json())
    .then(data => {
        console.log('checkUserAuth data: ', data)
        if(data.isLoggedIn) {
            console.log('poop')
            navigate("/dashboard")
        }
    })
    }

    return (
        <form onSubmit={event => handleRegister(event)}>
            <input required type='username'/>
            <input required type='password'/>
            <input type='submit' value='Submit'/>
            <p>Register</p>
        </form>
            
    )
}

export default Register;