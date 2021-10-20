import React, {  useState } from 'react';
import { Redirect } from 'react-router';

const Login = ({action}) => {
    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");
    let [displayError, setDisplayError] = useState(false);
    let [redirect, setRedirect] = useState(null);

    const sumbitData = () => {
        if (!email || !password) {
            displayLoginError();
        }
        fetch("http://localhost:3001/validate", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ "email": email, "password": password })
        }).then(response => {
            return response.json();
        }).then(response => {
            setEmail(email = "")
            setPassword(password = "")
            console.log(response);
            if (response) {
                action(response.key, response.name, response.email);
                setRedirect(redirect = "/");
            }
            else {
                displayLoginError();
            }
        });
    }

    const displayLoginError = () => {
        setDisplayError(displayError = true);
    }

    if (redirect) {
        return <Redirect to={redirect} />
    }
    return (
        <section className="mainSection">
            <h1 className="pageTitle">Log In</h1>
            <section className="formSection">
                <div>
                    <label htmlFor="email">Email: </label>
                    <input id="email" type="email" value={email} onChange={event => setEmail(email = event.target.value)} />
                </div>
                <div>
                    <label htmlFor="password">Password: </label>
                    <input id="password" type="password" value={password} onChange={event => setPassword(password = event.target.value)} />
                </div>
                <p className={displayError ? "errMsg" : "errMsg hidden"}>Invalid email and/or password</p>
                <button onClick={sumbitData}>Log in</button>
                <p>Don't have an account? Get one <a href="/signup">here</a></p>
            </section>
        </section>
    );
}

export default Login;