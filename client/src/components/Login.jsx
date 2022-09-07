import { useNavigate } from 'react-router'
import { useEffect } from 'react'

function Login() {
    const navigate = useNavigate()

    useEffect(() => {
        checkUserAuth();
    }, [])

    function handleLogin(e) {
        e.preventDefault()

        const form = e.target;
        const user = {
            username: form[0].value,
            password: form[1].value
        }

        fetch("http://localhost:3333/login", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(user)
        })
        .then(res => res.json())
        .then(data => {
            console.log('handleLogin: ', data)
            localStorage.setItem("token", data.token)
            checkUserAuth();
        })
    }

    function checkUserAuth() {
        fetch("http://localhost:3333/checkUserAuth", {
        headers: {
            "x-access-token": localStorage.getItem("token")
        }
    })
    .then(res => res.json())
    .then(data => {
        if(data.isLoggedIn) {
            console.log('Login Successful')
            navigate("/")
        }
    })
}

    return (
        <form onSubmit={event => handleLogin(event)}>
            <input required type='username'/>
            <input required type='password'/>
            <input type='submit' value='Submit'/>
            <p>Login</p>
        </form>
            
    )
}

export default Login;