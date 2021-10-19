import React, { useState } from "react";
import { Redirect } from "react-router";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [displayError, setDisplayError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [redirect, setRedirect] = useState();

  const sumbitData = () => {
    if (password !== confirmPass) {
      setErrorMsg("Passwords do not match");
      setDisplayError(true);
      return;
    }

    if (password.length < 6) {
      setErrorMsg("Password is too short");
      setDisplayError(true);
      return;
    }

    fetch("http://localhost:3001/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: name, email: email, password: password }),
    })
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        console.log(response);
        if (!response) {
          setErrorMsg("Email already in use");
          setDisplayError(true);
        } else {
          setName("");
          setEmail("");
          setPassword("");
          setConfirmPass("");
          setRedirect("/login");
        }
      });
  };

  if (redirect) {
    return <Redirect to={redirect} />;
  }
  return (
    <section className="mainSection">
      <h1 className="pageTitle">Sign Up</h1>
      <section className="formSection">
        <div>
          <label htmlFor="name">Name: </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="email">Email: </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password: </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="confirmPass">Confirm Password: </label>
          <input
            id="confirmPass"
            type="password"
            value={confirmPass}
            onChange={(event) => setConfirmPass(event.target.value)}
          />
        </div>
        <p className={displayError ? "errMsg" : "errMsg hidden"}>{errorMsg}</p>
        <button onClick={sumbitData}>Sign up</button>
        <p>
          Already have an account? Log in <a href="/login">here</a>
        </p>
      </section>
    </section>
  );
};

export default Signup;
