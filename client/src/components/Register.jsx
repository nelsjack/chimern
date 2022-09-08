import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import "./Register.css"
import mongoat from "../mongoat.png"
import lionode from "../lionode.png"
import dreacton from "../dreacton.png"

function Register() {
const [usernameFieldValue, setUsernameFieldValue] = useState("")
const [passwordFieldValue, setPasswordFieldValue] = useState("")
const [buttonStatus, setButtonStatus] = useState("")
const [creature, setCreature] = useState("")
const navigate = useNavigate();

useEffect(() => {
    checkUserAuth();
    checkUserInput();
})

async function handleRegister(e) {
    e.preventDefault()
    const form = e.target;
    const user = {
        username: form[0].value,
        password: form[1].value,
        creature: creature
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
        console.log('Registration Successful')
        checkUserAuth();
    })
}

    function displayFlavorText() {
        if (creature === "mongoat") return "MONGOAT Lorem ipsum dolor sit amet, consectetur adipiscing elit."
        if (creature === "dreacton") return "DREACTON Lorem ipsum dolor sit amet, consectetur adipiscing elit."
        if (creature === "lionode") return "LIONODE Lorem ipsum dolor sit amet, consectetur adipiscing elit."
    }

    function checkUserInput() {
        if (usernameFieldValue && passwordFieldValue && creature) {
            setButtonStatus("is-primary")
        } else {
            setButtonStatus("is-disabled")
        }
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
            navigate("/")
        }
    })
}

    return (
        <div className="registration-container">
            <h1 className="title">Welcome to CHIMERN</h1>
            <p className="prompt">Choose a username and password, and choose your first creature!</p>
            <div className="creature-btn-container">
                <button className="nes-btn creature-btn" onClick={() => setCreature("mongoat")}>
                    <img className="creature-sprite" src={mongoat} alt="mongoat"/>
                </button>
                <button className="nes-btn creature-btn" onClick={() => setCreature("dreacton")}>
                    <img className="creature-sprite" src={dreacton} alt="dreacton"/>
                </button>
                <button className="nes-btn creature-btn" onClick={() => setCreature("lionode")}>
                    <img className="creature-sprite" src={lionode} alt="lionode"/>
                </button>
            </div>
            <p className="flavor-text">{displayFlavorText()}</p>
            <form onSubmit={event => handleRegister(event)}>
                <div className="nes-field">
                    <label className="input-label">Username</label>
                    <input className={"nes-input"} required type="username" onChange={(e) => {setUsernameFieldValue(e.target.value)}}/>
                    <label className="input-label">Password</label>
                    <input className={"nes-input"} required type="password" onChange={(e) => {setPasswordFieldValue(e.target.value)}}/>
                    <div className="nes-btn-container">
                        <button className={"nes-btn " + buttonStatus} type="submit">Create Account</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Register;