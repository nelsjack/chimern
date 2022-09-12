import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import "../styles/Login.css"
import mongoat from "../../assets/mongoat.png"
import lionode from "../../assets/lionode.png"
import dreacton from "../../assets/dreacton.png"

function Login() {
    const [valid, setValid] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        checkUserAuth();
    })

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
            console.log(data)
            if (!data.valid) {
                setValid(false);
            } else {
                localStorage.setItem("token", data.token)
            }
            checkUserAuth();
        })
    }

    function handleInvalidClick() {
        setValid(true);
    }

    function handleNewUserClick() {
        navigate("/register")
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
            console.log("Login Successful")
            navigate("/")
        }
    })
}

    return (
        <div>
            {!valid &&
                <div className="invalid-login-container">
                    <div className="invalid-login-dimmer"></div>
                    <div className="invalid-message nes-container is-centered">
                            <p>Incorrect username or password</p>
                            <button className="nes-btn is-primary" onClick={handleInvalidClick}>Try Again</button>
                    </div>
                </div>
            }
            <div className="login-container">
                <h1 className="title">CHIMERN</h1>
                <div className="img-container">
                    <img className="creature" src={mongoat} alt="mongoat"/>
                    <img className="creature" src={lionode} alt="lionode"/>
                    <img className="creature" src={dreacton} alt="dreacton"/>
                </div>
                <form onSubmit={event => handleLogin(event)}>
                    <div className="nes-field">
                        <label className="input-label">Username</label>
                        <input className="nes-input" required type="username"/>
                        <label className="input-label">Password</label>
                        <input className="nes-input" required type="password"/>
                        <div className="nes-btn-container">
                            <button className="nes-btn is-primary" type="submit">Login</button>
                            <button className="nes-btn is-success" id="new-user" type="button" onClick={handleNewUserClick}>New User?</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login;