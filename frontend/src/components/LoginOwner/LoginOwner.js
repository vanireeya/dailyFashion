import React, { Component } from 'react';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {USER_URL} from '../../constants/constants';

var bcrypt = require('bcryptjs');

class LoginOwner extends Component {
    constructor(props) {
        super(props);
        let myData = JSON.parse(localStorage.getItem('myData'));
        let type_user = "U";
        if (props && props.location && props.location.state && props.location.state.type) {
            type_user = props.location.state.type
            
        }
        this.state = {
            email: "",
            pswd: "",
            authFlag: false,
            errorFlag: false,
            invalidFlag: false,
            type:type_user,
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

            // let salt = bcrypt.genSaltSync(8);
            // let hash = bcrypt.hashSync(this.state.pswd, salt);
            const data = {
                email: this.state.email,
                password: this.state.pswd,
                type: this.state.type
            }

            axios.post(`${USER_URL}/login`, data)
                .then(response => {
                    console.log("Status Code : ", response.status);
                    if (response.status === 200) {
                        console.log(response.data)
                        if (response.data) {
                            if (!response.data.Status) {
                                
                                let data ={
                                    firstname: response.data.fname,
                                    lastname: response.data.lname,
                                    type: response.data.type,
                                    userId: response.data.user_id,
                                    email: response.data.email
                                }
                                localStorage.setItem('myData', JSON.stringify(data));
                                let test = JSON.parse(localStorage.getItem('myData'));
                                console.log(test.firstname);
                                this.setState({
                                    authFlag: true,
                                    invalidFlag: false,
                                    myData: test
                                })
                            } else {
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
        require('./LoginOwner.css')

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

        if (this.state.myData && (this.state.myData.type=="A" || this.state.myData.type=="a" )) {
            redirectVar = <Redirect to="/ownerListing" />
        }else if (this.state.myData && (this.state.myData.type=="U" || this.state.myData.type=="u" )){
            redirectVar = <Redirect to="/TravelerSearch" />
        }
        return (

            <div className="img">
                {redirectVar}


                <div id="">
                    <nav className="navbar navbar-expand-sm" style={{ 'background-color': 'rgba(241, 241, 241, 0.28)', 'padding': ' 1%' }}>
                        <div className="container-fluid" >
                            <div className="navbar-header">
                                <a className="navbar-brand" id="mainHeading" href="/">Fashiop</a>
                            </div>

                            <ul className="nav navbar-nav navbar-right">
                                <li style={{ marginRight: "15px" }}>
                                    {/* <img alt="HomeAway birdhouse" src=""></img> */}
                                </li>
                            </ul>
                        </div>
                    </nav>
                </div>
                <div >
                    {/* <div style={{ 'text-align': 'center', "margin-top": "5%" }}>
                        <div><span id="loginHeading">Log in to HomeAway</span></div>
                        <div><span id="" style={{ 'color': '#666', 'font-size': '18px' }}>Need an account? <span style={{ color: '#2a6ebb' }}>Sign Up</span></span></div>
                    </div> */}
                    <div >
                        <div className="container-fluid " style={{ marginTop: '5%' }}>
                            <div className="row">
                                <div className="col-md-4"></div>
                                {/* <div className="col-md-4">
                                    <div >
                                    <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
                                    </div>
                                </div> */}

                                <div className="col-md-4">
                                    <div className="formProps">
                                        <div className="padding5" style={{ "font-size": "25px" }}>Login</div>
                                        <hr style={{ margin: '0px' }}></hr>
                                        {invalid}
                                        <div className="padding5 " style={{ "margin-top": "10px" }}>
                                            <input className="inputField" type="text" onChange={this.handleEmailChange} placeholder="Email address"></input>
                                            {errorEmail}
                                        </div>
                                        <div className="padding5">
                                            <input className="inputField" type="password" onChange={this.handlePasswordChange} placeholder="Password"></input>
                                            {errorPswd}
                                        </div>
                                        {/* <div class="form-group padding5 " style={{ "marginBottom": '0px' }}>
                                            <span id="urlForgotPassword" style={{ "display": "none" }}>/forgotPassword?service=https%3A%2F%2Fwww.homeaway.com%2Fexp%2Fsso%2Fauth%3Flt%3Dtraveler%26context%3Ddef%26service%3D%252F</span>
                                            <a href=""
                                                id="forgotPasswordUrl" class="forgot-password">Forgot password?</a>
                                        </div> */}
                                        <div class="form-group padding5" style={{ "marginBottom": '0px' }}>
                                            <input type="submit" className="btn btn-primary  " onClick={this.login} value="Log In" id="loginButton" tabindex="4" />
                                            <div class="remember checkbox traveler">
                                                <label for="rememberMe">
                                                    <input id="rememberMe" name="rememberMe" tabindex="3" checked="true" type="checkbox" value="true" /><input type="hidden" name="_rememberMe" value="on" />
                                                    Keep me signed in
                                </label>
                                            </div>
                                        </div>
                                        <hr style={{ margin: '0px' }}></hr>
                                        {/* <div style={{ "text-align": "center" }}>
                                <span>Want to list your property? <span>Learn More</span></span>
                            </div> */}
                                        <div class="text-center footerInfo">
                                            <div>
                                                <span>
                                                    Not a user?
                                    </span>

                                                <Link to={{ pathname: '/SignUp', state: { type: this.state.type } }}>
                                                    <span style={{ "marginLeft": '1px',fontSize:"15px" }}> Sign up</span>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-2"></div>

                            </div>
                        </div>

                    </div>
                    <br /><br /><br /><br /><br /><br />

                </div>

            </div>
        )
    }
}

export default LoginOwner;