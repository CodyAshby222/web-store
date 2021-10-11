import React, { Component} from 'react';
import { Redirect } from 'react-router';



class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            displayError: false,
            redirect: null
        };
    }


    sumbitData = () => {
        if(!this.state.email || !this.state.password) {
            this.displayError();
        }
        fetch("http://localhost:3001/validate", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({ "email": this.state.email, "password": this.state.password})
        }).then(response => {
            return response.json();
        }).then(response => {
            this.setState({
                email: "",
                password: ""
            });
            console.log(response);
            if(response) {
                this.props.action(response.key, response.name, response.email);
                this.setState({
                    redirect: "/"
                });
            }
            else{
                this.displayError();
            }
        });
    }

    displayError = () => {
        this.setState({
            displayError: true
        });
    }

    render() {
        if(this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }
        return(
            <section className="mainSection">
                <h1 className="pageTitle">Log In</h1>
                <section className="formSection">
                    <div>
                        <label htmlFor="email">Email: </label>
                        <input id="email" type="email" value={this.state.email} onChange={event => this.setState({email: event.target.value})}/>
                    </div>
                    <div>
                        <label htmlFor="password">Password: </label>
                        <input id="password" type="password" value={this.state.password} onChange={event => this.setState({password: event.target.value})}/>
                    </div>
                    <p className={this.state.displayError ? "errMsg" : "errMsg hidden"}>Invalid email and/or password</p>
                    <button onClick={this.sumbitData}>Log in</button>
                    <p>Don't have an account? Get one <a href="/signup">here</a></p>
                </section>
            </section>
        );
    }
}

export default Login;