import React, { Component } from 'react';
import cookie from 'react-cookies';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import axios from 'axios';
import {USER_URL} from '../../constants/constants';


var bcrypt = require('bcryptjs');

class SignUp extends Component {
    constructor(props) {
        super(props);
        let myData = JSON.parse(localStorage.getItem('myData'));
        let type_user, redirectFlag;
        if (props && props.location && props.location.state && props.location.state.type) {
            type_user = props.location.state.type
            redirectFlag = false;
        } else {
            redirectFlag = true;
        }
        this.state = {
            type: type_user,
            firstname: "",
            lastname: "",
            email: "",
            pswd: "",
            myData: myData,
            authFlag: false,
            errorFlag: false,
            duplicateFlag: false,
            redirectFlag: redirectFlag
        }
        this.handleFirstnameChange = this.handleFirstnameChange.bind(this);
        this.handleLastnameChange = this.handleLastnameChange.bind(this)
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.signup = this.signup.bind(this);
    }

    handleFirstnameChange(e) {
        this.setState({
            firstname: e.target.value
        })
    }
    handleLastnameChange(e) {
        this.setState({
            lastname: e.target.value
        })
    }
    handleEmailChange(e) {
        this.setState({
            email: e.target.value
        })
    }
    handlePasswordChange(e) {
        this.setState({
            pswd: e.target.value
        })
    }
    signup() {
        if (this.state.email && this.state.pswd && this.state.firstname && this.state.lastname && /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.state.email)) {
            const data = {
                email: this.state.email,
                password: this.state.pswd,
                type: this.state.type,
                fname: this.state.firstname,
                lname: this.state.lastname
            }
            axios.post(`${USER_URL}/signup`, data)
                .then(response => {
                    console.log("Status Code : ", response.status);
                    if (response.status === 200 || response.status === 201) {
                        console.log(response.data)
                        if (response.data) {
                            if (!response.data.Status) {
                                console.log(response.data)
                                let data={
                                    firstname:response.data.fname,
                                    lastname: response.data.lname,
                                    type: response.data.type,
                                    userId: response.data.user_id,
                                    email:response.data.email
                                }
                                localStorage.setItem('myData', JSON.stringify(data));
                                let test = JSON.parse(localStorage.getItem('myData'));
                                console.log(test.firstname);
                                this.setState({
                                    authFlag: true,
                                    invalidFlag: false,
                                    myData: test
                                })
                            } else if (response.data.Status === -1) {
                                this.setState({
                                    duplicateFlag: true
                                })
                            }
                        }
                    } else {
                        this.setState({
                            duplicateFlag: true,
                            authFlag: false
                        })
                    }
                }, resp => {
                    if (resp.response && resp.response.data && resp.response.data.status === -1) {
                        this.setState({
                            duplicateFlag: true,
                            authFlag: false
                        })
                    }
                });
        } else {
            this.setState({
                errorFlag: true
            })
        }
    }
    render() {
        require('./SignUp.css')
        let signup = null;
        // if (this.state.type === "T") {
        //     signup = <a href="/TravelerLogin"><span style={{ color: '#2a6ebb' }}>Log in</span></a>
        // } else {
        //     signup = <a href="/OwnerLogin"><span style={{ color: '#2a6ebb' }}>Log in</span></a>
        // }

        let errorEmail, errorPswd, errorFirstname, errorLastname, duplicate, redirectVar;

        if (this.state.errorFlag) {
            if (!this.state.email || !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.state.email)) {

                errorEmail = <div><span className="error">Enter valid email</span></div>
            }
            if (!this.state.pswd) {
                errorPswd = <span className="error">Enter password</span>
            }
            if (!this.state.firstname) {
                errorFirstname = <div style={{ width: "52%", float: "left", marginBottom: "16px" }}> <span className="error">Enter first name</span></div>
            }
            if (!this.state.lastname) {
                errorLastname = <div><span style={{ width: "48%", float: "left" }} className="error">Enter last name</span></div>
            }
        }
        if (this.state.duplicateFlag) {
            duplicate = <div style={{ marginTop: '10px', color: "white", background: "#ed605a", padding: "10px" }} className="invalid">
                <span>
                    Email address is already in use.
            </span>
            </div>
        }
        if (this.state.myData) {
            if (this.state.myData.type === "U") {
                redirectVar = <Redirect to="/TravelerSearch" />
            } else if (this.state.myData.type === "A") {
                redirectVar = <Redirect to="/OwnerListing" />
            }

        }
        if (this.state.redirectFlag) {
            redirectVar = <Redirect to="/" />
        }
        return (

            <div style={{ backgroundColor: "#f4f4f4" }}>
                {redirectVar}


                <div id="">
                    <nav className="navbar navbar-expand-sm" style={{ 'border-bottom-color': '#dfdbdb', 'padding': ' 1%', 'backgroundColor': 'white' }}>
                        <div className="container-fluid" >
                            <div className="navbar-header">
                                <a className="navbar-brand" id="mainHeading" href="/">Fashiop</a>
                            </div>

                            {/* <ul className="nav navbar-nav navbar-right">
                                <li style={{ marginRight: "15px" }}>
                                    <img alt="HomeAway birdhouse" src="//csvcus.homeaway.com/rsrcs/cdn-logos/2.10.6/bce/moniker/homeaway_us/birdhouse-bceheader.svg"></img>
                                </li>
                            </ul> */}
                            {/* {navLogin}s */}
                        </div>
                    </nav>
                </div>
                <div>
                    {/* <div style={{ 'text-align': 'center', "margin-top": "3%" }}>
                        <div><span id="loginHeading">Sign up for HomeAway</span></div>
                        <div><span id="" style={{ 'color': '#666', 'font-size': '18px' }}>Already have an account? {signup} </span></div>
                    </div> */}
                    <div>
                        <div className="formProps">
                            {duplicate}
                            <div className="padding5 " style={{ "margin-top": "10px" }}>
                                <input className="inputField1" onChange={this.handleFirstnameChange} style={{ width: '48%' }} type="text" placeholder="First Name"></input>
                                <input className="inputField1" onChange={this.handleLastnameChange} style={{ width: '48%', marginLeft: '4%' }} type="text" placeholder="Last name"></input>
                                {errorFirstname}{errorLastname}
                            </div>
                            <div className="padding5">
                                <input onChange={this.handleEmailChange} className="inputField" type="text" placeholder="Email"></input>
                                {errorEmail}
                            </div>
                            <div className="padding5">
                                <input onChange={this.handlePasswordChange} className="inputField" type="password" placeholder="Password"></input>
                                {errorPswd}
                            </div>
                            <div class="form-group padding5" style={{ "marginBottom": '0px', "text-align": "center" }}>
                                <input type="submit" className="btn btn-primary" onClick={this.signup} value="Sign Me Up" id="loginButton" tabindex="4" />
                                <div class="remember checkbox traveler">
                                    <label>
                                        We don't post anything without your permission.
                                    </label>
                                    <label style={{ marginTop: "5px", fontSize: "10px", marginBottom: "0px" }}>
                                        By creating an account you are accepting our Terms and Conditions and Privacy Policy.
                                    </label>
                                </div>
                            </div>
                        </div>
                        <br />
                    </div>
                    <br />

                </div>

            </div>
        )
    }
}

export default SignUp;