import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import HeaderTraveller from '../HeaderTraveller/HeaderTraveller'
// import {HeaderTraveller} from './HeaderTraveller'
// import FaEnvelope from 'react-icons/fa'
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
// import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
// import '../../../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js'


//create the Navbar Component
class AccountTraveller extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pswd: "",
            newPswd: "",
            cnfrmPswd: "",
            errorIncompleteFlag: false,
            errorNotMatched: false,
            updateSuccess: false
        }
        this.fieldChangeHandler = this.fieldChangeHandler.bind(this);
        this.submitChanges = this.submitChanges.bind(this)
    }
    fieldChangeHandler(e) {
        let changedVar = {}
        changedVar[e.target.name] = e.target.value
        this.setState(changedVar)
    }
    submitChanges() {
        console.log(this.state.pswd + " " + this.state.newPswd + " " + this.state.cnfrmPswd)
        if (this.state.pswd && this.state.newPswd && this.state.cnfrmPswd) {
            if (this.state.newPswd == this.state.cnfrmPswd) {

            } else {
                this.setState({
                    errorNotMatched: true,
                    errorIncompleteFlag: false,
                    updateSuccess: false
                })
            }
        } else {
            this.setState({
                errorIncompleteFlag: true,
                updateSuccess: false
            })
        }
    }
    render() {
        require('./AccountTraveller.css')
        let error;
        if (this.state.errorIncompleteFlag) {
            error = <div className="errorColm1">
                <i style={{ color: "#ff4848" }} class="fa fa-exclamation-circle fonticons1"></i>
                <div style={{ marginTop: "6px" }} > All fields are compulsory</div>
            </div>
        }
        if (this.state.errorNotMatched) {
            error = <div className="errorColm1">
                <i style={{ color: "#ff4848" }} class="fa fa-exclamation-circle fonticons1"></i>
                <div style={{ marginTop: "6px" }} > New password and confirm password does not match</div>
            </div>
        }
        if (this.state.updateSuccess) {
            error = <div style={{background:"rgba(24, 110, 3, 0.23)","border-color":"#186e037a"}} className="errorColm1">
                <i style={{ color: "rgb(24, 110, 3)" }} class="far fa-check-circle fonticons1"></i>
                <div style={{ marginTop: "6px" }} >Password Updated successfully</div>
            </div>
        }
        return (
            <div>
                {/* {redirectVar} */}

                <HeaderTraveller />
                <div style={{ marginLeft: '7%' }}>
                    <h3 style={{ margin: "30px 0 30px 0" }}><b>Account Settings</b></h3>
                    <div className="profileForm">
                        <div className="pswdHeading"><b>Change your Password</b></div>
                        {error}
                        <div>
                            <table style={{ width: "100%" }}>
                                <tr>
                                    <td className="pswdLabel">Current password</td>
                                    <td ><input style={{ marginTop: '18px' }} onChange={this.fieldChangeHandler} className="pwsdInput" name="pswd" type="password" id="pswd" /></td>
                                </tr>
                                <tr>
                                    <td className="pswdLabel">New password</td>
                                    <td><input className="pwsdInput" onChange={this.fieldChangeHandler} type="password" name="newPswd" id="newPswd" /></td>
                                </tr>
                                <tr>
                                    <td className="pswdLabel">Confirm password</td>
                                    <td><input className="pwsdInput" onChange={this.fieldChangeHandler} type="password" name="cnfrmPswd" id="cnfrmPswd" /></td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td><button onClick={this.submitChanges} className="btn btn-primary pswSave">Save</button></td>
                                </tr>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default AccountTraveller;