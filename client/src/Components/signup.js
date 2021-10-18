import React, { Component} from 'react';
import { Redirect } from 'react-router';

class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            email: "",
            password: "",
            confirmPass: "",
            displayError: false,
            errorMsg: ""
        };
    }

    
    sumbitData = () => {
        if(this.state.password != this.state.confirmPass) {
            this.setState({
                errorMsg: "Passwords do not match",
                displayError: true
            });
            return;
        }

        if(this.state.password.length < 6) {
            this.setState({
                errorMsg: "Password is too short",
                displayError: true
            });
            return;
        }
        


        fetch("http://localhost:3001/user", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"},
            body: JSON.stringify({name: this.state.name, email: this.state.email, password: this.state.password})
        }).then(response => {
            return response.json();
        }).then(response => {
            console.log(response);
            if(!response) {
                this.setState({
                    errorMsg: "Email already in use",
                    displayError: true
                });
            }
            else {
                this.setState({
                    name: "",
                    email: "",
                    password: "",
                    confirmPass: "",
                    redirect: "/login"
                });
            }
        });
        

    }


    render() {
        if(this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }
        return(
            <section className="mainSection">
                <h1 className="pageTitle">Sign Up</h1>
                <section className="formSection">
                    <div>
                        <label htmlFor="name">Name: </label>
                        <input id="name" type="text" value={this.state.name} onChange={event => this.setState({name: event.target.value})}/>
                    </div>
                    <div>
                        <label htmlFor="email">Email: </label>
                        <input id="email" type="email" value={this.state.email} onChange={event => this.setState({email: event.target.value})}/>
                    </div>
                    <div>
                        <label htmlFor="password">Password: </label>
                        <input id="password" type="password" value={this.state.password} onChange={event => this.setState({password: event.target.value})}/>
                    </div>
                    <div>
                        <label htmlFor="confirmPass">Confirm Password: </label>
                        <input id="confirmPass" type="password" value={this.state.confirmPass} onChange={event => this.setState({confirmPass: event.target.value})}/>
                    </div>
                    <p className={this.state.displayError ? "errMsg" : "errMsg hidden"}>{this.state.errorMsg}</p>
                    <button onClick={this.sumbitData}>Sign up</button>
                    <p>Already have an account? Log in <a href="/login">here</a></p>
                </section>
            </section>
        );
    }
}

export default Signup;