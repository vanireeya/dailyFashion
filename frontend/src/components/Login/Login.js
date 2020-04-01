import React, { Component } from 'react';
import cookie from 'react-cookies';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import axios from 'axios';
import {USER_URL} from '../../constants/constants';
var bcrypt = require('bcryptjs');



class Login extends Component {

    constructor(props) {
        super(props);
        let myData = JSON.parse(localStorage.getItem('myData'));
        this.state = {
            email: "",
            pswd: "",
            authFlag: false,
            errorFlag: false,
            invalidFlag: false,
            myData: myData
        }
        this.login = this.login.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
    }



    login() {
        var headers = new Headers();
        //prevent page from refresh
        // e.preventDefault();

        if (this.state.email && this.state.pswd && /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.state.email)) {

            let salt = bcrypt.genSaltSync(8);
            let hash = bcrypt.hashSync(this.state.pswd, salt);
            const data = {
                email: this.state.email,
                password: this.state.pswd,
                type: "T"
            }

            // console.log(bcrypt.compareSync("dkjfg", hash));
            // console.log(hash);
            // var hash1 = bcrypt.hashSync('dkjfg', 8);
            // console.log(bcrypt.compareSync("dkjfg", hash1));
            // console.log(hash1);


            //set the with credentials to true
            // axios.defaults.withCredentials = true;
            //make a post request with the user data
            axios.post(`${USER_URL}/login`, data)
                .then(response => {
                    console.log("Status Code : ", response.status);
                    if (response.status === 200) {
                        console.log(response.data)
                        if (response.data) {
                            if (response.data.status === 1) {
                                console.log(response.data.info)
                                localStorage.setItem('myData', JSON.stringify(response.data.info));
                                let test = JSON.parse(localStorage.getItem('myData'));
                                // console.log(JSON.parse(test));
                                console.log(test.firstname);
                                this.setState({
                                    authFlag: true,
                                    invalidFlag: false,
                                    myData: test
                                })
                            } else if (response.data.status === -1) {
                                this.setState({
                                    invalidFlag: true
                                })
                            }
                        }

                    } else {
                        this.setState({
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
    render() {
        require('./Login.css')

        let errorEmail, errorPswd, invalid, redirectVar;

        if (this.state.errorFlag) {
            if (!this.state.email || !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.state.email)) {

                errorEmail = <span className="error">Enter valid email</span>
            }
            if (!this.state.pswd) {
                errorPswd = <span className="error">Enter password</span>
            }
        }
        if (this.state.invalidFlag) {
            invalid = <div style={{ marginTop: '10px' }} className="invalid">
                <span>
                    The email or password you entered is incorrect.
            </span>
            </div>
        }

        if (cookie.load('cookie') && this.state.myData) {
            redirectVar = <Redirect to="/TravelerHome" />
        }

        return (

            <div style={{ backgroundColor: "#f4f4f4" }}>
                {redirectVar}


                <div id="">
                    <nav className="navbar navbar-expand-sm" style={{ 'border-bottom-color': '#dfdbdb', 'padding': ' 1%', 'backgroundColor': 'white' }}>
                        <div className="container-fluid" >
                            <div className="navbar-header">
                                <a className="navbar-brand" id="mainHeading" href="/">HomeAway</a>
                            </div>

                            <ul className="nav navbar-nav navbar-right">
                                <li style={{ marginRight: "15px" }}>
                                    <img alt="HomeAway birdhouse" src="//csvcus.homeaway.com/rsrcs/cdn-logos/2.10.6/bce/moniker/homeaway_us/birdhouse-bceheader.svg"></img>
                                </li>
                            </ul>
                        </div>
                    </nav>
                </div>
                <div>
                    <div style={{ 'text-align': 'center', "margin-top": "5%" }}>
                        <div><span id="loginHeading">Log in to HomeAway</span></div>
                        <div><span id="" style={{ 'color': '#666', 'font-size': '18px' }}>Need an account? <Link to={{ pathname: '/SignUp', state: { type: 'T' } }}><span style={{ color: '#2a6ebb' }}>Sign Up</span></Link></span></div>
                    </div>
                    <div>
                        <div className="formProps">
                            <div className="padding5" style={{ "font-size": "25px" }}>Account login</div>
                            <hr style={{ margin: '0px' }}></hr>
                            {invalid}
                            <div className="padding5 " style={{ "margin-top": "10px" }}>
                                <input className="inputField" type="text" onChange={this.handleEmailChange} placeholder="Email address"></input>
                                {errorEmail}
                            </div>
                            <div className="padding5">
                                <input className="inputField" onChange={this.handlePasswordChange} type="password" placeholder="Password"></input>
                                {errorPswd}
                            </div>
                            <div class="form-group padding5 " style={{ "marginBottom": '0px' }}>
                                <span id="urlForgotPassword" style={{ "display": "none" }}>/forgotPassword?service=https%3A%2F%2Fwww.homeaway.com%2Fexp%2Fsso%2Fauth%3Flt%3Dtraveler%26context%3Ddef%26service%3D%252F</span>
                                <a href=""
                                    id="forgotPasswordUrl" class="forgot-password">Forgot password?</a>
                            </div>
                            <div class="form-group padding5" style={{ "marginBottom": '0px' }}>
                                <input type="submit" onClick={this.login} className="btn btn-primary  " value="Log In" id="loginButton" tabindex="4" />
                                <div class="remember checkbox traveler">
                                    <label for="rememberMe">
                                        <input id="rememberMe" name="rememberMe" tabindex="3" checked="true" type="checkbox" value="true" /><input type="hidden" name="_rememberMe" value="on" />
                                        Keep me signed in
                                </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <br />

                </div>

            </div>
        )
    }
}

export default Login;