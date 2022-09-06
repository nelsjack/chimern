import React from 'react';
import { createBrowserHistory } from 'history'

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.history = createBrowserHistory();
        this.handleLogin = this.handleLogin.bind(this);
    }

    // componentDidMount() {
    //     fetch("http://localhost:3333/checkUserAuth", {
    //         headers: {
    //             "x-access-token": localStorage.getItem("token")
    //         }
    //     })
    //     .then(res => res.json())
    //     .then(data => data.isLoggedIn ? this.history.push("/dashboard"): null)
    // }

    render() {
        return (
            <form onSubmit={event => this.handleLogin(event)}>
                <input required type='username'/>
                <input required type='password'/>
                <input type='submit' value='Submit'/>
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
            console.log(data)
            localStorage.setItem("token", data.token)
        })
    }
}

export { Login };