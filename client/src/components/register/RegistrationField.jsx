function RegistrationField({handleRegister, setUsernameFieldValue, setPasswordFieldValue, buttonStyle, buttonDisabledStatus}) {
    
    return (
        <form onSubmit={event => handleRegister(event)}>
            <div className="nes-field">
                <label className="input-label">Username</label>
                <input className={"nes-input"} required type="username" onChange={(e) => {setUsernameFieldValue(e.target.value)}}/>
                <label className="input-label">Password</label>
                <input className={"nes-input"} required type="password" onChange={(e) => {setPasswordFieldValue(e.target.value)}}/>
                <div className="nes-btn-container">
                    <button className={"nes-btn " + buttonStyle} disabled={buttonDisabledStatus} type="submit">Create Account</button>
                </div>
            </div>
        </form>
    )
}

export default RegistrationField;