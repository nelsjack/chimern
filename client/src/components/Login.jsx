import React from 'react';
import { createBrowserHistory } from 'history'

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.history = createBrowserHistory();
        this.handleLogin = this.handleLogin.bind(this);
        this.checkUserAuth = this.checkUserAuth.bind(this);
    }

    componentDidMount() {
        this.checkUserAuth();
    }

    render() {
        return (
            <form onSubmit={event => this.handleLogin(event)}>
                <input required type='username'/>
                <input required type='password'/>
                <input type='submit' value='Submit'/>
                <p>Login</p>
            </form>
                
        )
    }

    handleLogin(e) {
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
            this.checkUserAuth();
        })
    }

    checkUserAuth() {
        fetch("http://localhost:3333/checkUserAuth", {
            headers: {
                "x-access-token": localStorage.getItem("token")
            }
        })
        .then(res => res.json())
        .then(data => {
            console.log('checkUserAuth data: ', data)
            if(data.isLoggedIn) {
                this.history.push("/dashboard")
            }
        })
    }
}

export default Login;