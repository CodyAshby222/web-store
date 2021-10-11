import React, { Component} from 'react';
import { Redirect } from 'react-router';


class EditAccount extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: this.props.name,
            email: this.props.email,
            password: "",
            confirmPass: "",
            displayError: false,
            redirect: null,
            errorMsg: ""
        };
    }

    componentDidMount() {
        this.props.closeMenu();
        if(!this.props.loggedIn) {
            this.setState({
                redirect: "/"
            })
        }
    }

    getPutData = () => {
        let putData = {
            name: this.state.name,
            email: this.state.email
        }
        if(this.state.password.length) putData.password = this.state.password;
        return putData;
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


        let putData = this.getPutData();
        fetch(`http://localhost:3001/user?key=${this.props.userKey}`, {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(putData)
        }).then(response => {
            return response.json();
        }).then(response => {
            if(!response) {
                this.setState({
                    errorMsg: "Email already in use",
                    displayError: true
                });
            }
            else {
                this.props.updateUser(response.name, response.email);
            }
        });
        
        
    }

    render() {
        if(!this.props.loggedIn) {
            return <Redirect to="/" />
        }
        if(this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }
        return(
            <section className="mainSection">
                <h1 className="pageTitle">Edit Account</h1>
                <section className="formSection">
                    <div>
                    <label htmlFor="email">Email: </label>
                    <input id="email" type="email" value={this.state.email} onChange={event => this.setState({email: event.target.value})}/>
                    </div>
                    <div>
                    <label htmlFor="name">Name: </label>
                    <input id="name" type="text" value={this.state.name} onChange={event => this.setState({name: event.target.value})}/>
                    </div>
                    <div className="passwordDiv">
                        <label htmlFor="password">Password: </label>
                        <input id="password" type="password" value={this.state.password} onChange={event => this.setState({password: event.target.value})}/>
                        <label htmlFor="confirmPass">Confirm Password: </label>
                        <input id="confirmPass" type="password" value={this.state.confirmPass} onChange={event => this.setState({confirmPass: event.target.value})}/>
                    </div>
                        <p className={this.state.displayError ? "errMsg" : "errMsg hidden"}>{this.state.errorMsg}</p>
                    <button onClick={this.sumbitData}>Submit</button>
                </section>
            </section>
        );
    }
}

export default EditAccount;