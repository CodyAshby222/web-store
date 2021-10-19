import React, { Component, useEffect, useState } from 'react';
import { Redirect } from 'react-router';


const EditAccount = ({ closeMenu, updateUser, loggedIn, userKey }) => {

    let [name, setName] = useState();
    let [email, setEmail] = useState();
    let [password, setPassword] = useState("");
    let [confirmPass, setConfirmPass] = useState("");
    let [displayError, setDisplayError] = useState(false);
    let [redirect, setRedirect] = useState(null);
    let [errorMsg, setErrorMsg] = useState("");


    useEffect(() => {
        closeMenu();
        if (!loggedIn) {
            setRedirect(redirect = "/");
        }
    }, [])

    const getPutData = () => {
        let putData = {
            name: name,
            email: email
        }
        if (password.length) putData.password = password;
        return putData;
    }

    const sumbitData = () => {
        if (password != confirmPass) {
            setErrorMsg(errorMsg = "Passwords do not match")
            setDisplayError(displayError = true)
            return;
        }

        if (password.length < 6) {
            setErrorMsg(errorMsg = "Password is too short")
            setDisplayError(displayError = true)
            return;
        }


        let putData = getPutData();
        fetch(`http://localhost:3001/user?key=${userKey}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(putData)
        }).then(response => {
            return response.json();
        }).then(response => {
            if (!response) {
                setErrorMsg(errorMsg = "Email already in use")
                setDisplayError(displayError = true)
            }
            else {
                updateUser(response.name, response.email);
            }
        });


    }

    if (!loggedIn) {
        return <Redirect to="/" />
    }
    if (redirect) {
        return <Redirect to={redirect} />
    }
    return (
        <section className="mainSection">
            <h1 className="pageTitle">Edit Account</h1>
            <section className="formSection">
                <div>
                    <label htmlFor="email">Email: </label>
                    <input id="email" type="email" value={email} onChange={event => setEmail(email = event.target.value)} />
                </div>
                <div>
                    <label htmlFor="name">Name: </label>
                    <input id="name" type="text" value={name} onChange={event => setName(name = event.target.value)} />
                </div>
                <div className="passwordDiv">
                    <label htmlFor="password">Password: </label>
                    <input id="password" type="password" value={password} onChange={event => setPassword(password = event.target.value )} />
                    <label htmlFor="confirmPass">Confirm Password: </label>
                    <input id="confirmPass" type="password" value={confirmPass} onChange={event => setConfirmPass(confirmPass = event.target.value)} />
                </div>
                <p className={displayError ? "errMsg" : "errMsg hidden"}>{errorMsg}</p>
                <button onClick={sumbitData}>Submit</button>
            </section>
        </section>
    );
}

export default EditAccount;