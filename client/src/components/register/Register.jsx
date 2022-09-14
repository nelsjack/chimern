import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import CreatureSelect from "./CreatureSelect"
import RegistrationField from './RegistrationField'
import "../styles/Register.css"
import "../constants/register.js"
import { TITLE, PROMPT } from '../constants/register.js'
import { DREACTON_FLAVOR_TEXT, LIONODE_FLAVOR_TEXT, MONGOAT_FLAVOR_TEXT } from '../constants/creatures'

function Register() {
const [usernameFieldValue, setUsernameFieldValue] = useState("")
const [passwordFieldValue, setPasswordFieldValue] = useState("")
const [creature, setCreature] = useState("")
const [buttonStyle, setButtonStyle] = useState("")
const [buttonDisabledStatus, setButtonDisabledStatus] = useState(false)
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
        creature
    }
    console.log(user)

    fetch("http://localhost:3333/register", {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(user)
    })
    .then(res => {
        res.json().then(data => {
            console.log('registration status: ', data)
            localStorage.setItem("token", data.token)
            console.log('Registration Successful')
            checkUserAuth();
        })
    })
}

    function displayFlavorText() {
        if (creature === "mongoat") return MONGOAT_FLAVOR_TEXT;
        if (creature === "dreacton") return DREACTON_FLAVOR_TEXT;
        if (creature === "lionode") return LIONODE_FLAVOR_TEXT;
    }

    function checkUserInput() {
        if (usernameFieldValue && passwordFieldValue && creature) {
            setButtonStyle("is-primary")
            setButtonDisabledStatus(false)
        } else {
            setButtonStyle("is-disabled")
            setButtonDisabledStatus(true)
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
            <h1 className="title">{TITLE}</h1>
            <p className="prompt">{PROMPT}</p>
            <CreatureSelect setCreature={setCreature} displayFlavorText={displayFlavorText}/>
            <RegistrationField handleRegister={handleRegister} setUsernameFieldValue={setUsernameFieldValue} setPasswordFieldValue={setPasswordFieldValue} buttonStyle={buttonStyle} buttonDisabledStatus={buttonDisabledStatus}/>
        </div>
    )
}

export default Register;