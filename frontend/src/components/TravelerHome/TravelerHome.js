import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import axios from 'axios';


//create the Navbar Component
class TravelerHome extends Component {
    constructor(props) {
        super(props);
        let myData = JSON.parse(localStorage.getItem('myData'));
        this.state = {
            myData: myData,
            authFlag: false,
            city: "",
            tripStart: "",
            tripEnd: "",
            guests: "",
            property: {},
            search:""
        }
        this.handleLogout = this.handleLogout.bind(this);
        this.fieldChangeHandler = this.fieldChangeHandler.bind(this)

        this.search = this.search.bind(this)
    }
    // handle logout to destroy the cookie and clear local storage
    handleLogout = () => {
        cookie.remove('cookie', { path: '/' })
        localStorage.clear();
        this.setState({
            authFlag: true
        })
        this.fieldChangeHandler = this.fieldChangeHandler.bind(this)
    }

    fieldChangeHandler(e) {
        let changedVar = {}
        changedVar[e.target.name] = e.target.value
        this.setState(changedVar)
    }

    search() {
        console.log(this.state.guests)


        if (this.state.city && this.state.tripStart && this.state.tripEnd && this.state.guests) {
            let data = {
                city: this.state.city,
                tripStart: this.state.tripStart,
                tripEnd: this.state.tripEnd,
                guests: this.state.guests
            }
            data = JSON.stringify(data)
            axios.defaults.withCredentials = true;
            axios.get('http://localhost:3001/search/' + data)
                .then((response) => {
                    console.log(response.data);
                    if (response.data.status == 1) {
                        this.setState({
                            authFlag:true,
                            property:response.data.property,
                            search:data
                        })
                        
                    }
                });
        } else {
            alert("Please fill in all the search criteria")
        }

    }

    render() {
        require('./TravelerHome.css')

        let redirectVar = null;

        if (!cookie.load('cookie') || !this.state.myData) {
            localStorage.clear();
            redirectVar = <Redirect to="/" />
        } else {
            if (this.state.myData.type == "O") {
                redirectVar = <Redirect to="/OwnerDashboard" />
            }

            if(this.state.authFlag){
                // redirectVar = <Redirect to="/ProfileTraveller" />
                redirectVar= <Redirect to={{pathname: '/TravelerSearch',state: { property: this.state.property,search:this.state.search }}} />
            }
        }
        return (
            <div>
                {redirectVar}


                <div id="mainDiv">
                    <nav className="navbar navbar-expand-sm">
                        <div className="container-fluid" style={{ marginTop: "10px" }}>
                            <div className="navbar-header">
                                <a className="navbar-brand" id="mainHeading1" href="/">HomeAway</a>
                            </div>

                            <ul className="nav navbar-nav navbar-right">
                                <li >
                                    <a href="#" id="noFocus" style={{ 'color': "white", 'font-size': '15px' }}>Trip Boards</a>
                                </li>


                                <li className="dropdown">
                                    <a href="#" id='noFocus' className="dropdown-toggle" data-toggle="dropdown" style={{ 'color': "white", 'font-size': '15px' }}>{this.state.myData.firstname} <span class="caret"></span></a>
                                    <ul className="dropdown-menu">
                                        <li id="">
                                            <a href="#" className='Dropdown__menu Dropdown__menu--open Dropdown__menu--right dropList'  ><i className="far fa-envelope" style={{ 'margin-right': '7px', 'color': 'grey' }}></i>Inbox</a>
                                        </li>
                                        <li id="">
                                            <a href="/MytripTraveller" className='Dropdown__menu Dropdown__menu--open Dropdown__menu--right dropList'  ><i className="fa fa-suitcase" style={{ 'margin-right': '7px', 'color': 'grey' }}></i>My Trips</a>
                                        </li>
                                        <li id="">
                                            <a href="ProfileTraveller" className='Dropdown__menu Dropdown__menu--open Dropdown__menu--right dropList'  ><i className="fa fa-user" style={{ 'margin-right': '7px', 'color': 'grey' }}></i>My profile</a>
                                        </li>
                                        <li id="">
                                            <a href="AccountTraveller" className='Dropdown__menu Dropdown__menu--open Dropdown__menu--right dropList'  ><i className="fa fa-cog" style={{ 'margin-right': '7px', 'color': 'grey' }}></i>Account</a>
                                        </li>
                                        {/* <li id="">
                                            <a href="#" className='Dropdown__menu Dropdown__menu--open Dropdown__menu--right dropList'  ><i className="fa fa-co" style={{'margin-right':'7px','color':'grey'}}></i>Owner Dashboard</a>
                                        </li> */}
                                        <li id="">
                                            <a href="" onClick={this.handleLogout} className='Dropdown__menu Dropdown__menu--open Dropdown__menu--right dropList'  ><span class="glyphicon glyphicon-log-out" style={{ 'margin-right': '7px', 'color': 'grey' }}></span>Logout</a>
                                        </li>


                                    </ul>
                                </li>
                                <li className="dropdown iconStyle"><i className="far fa-envelope"></i>
                                </li>

                                <li className="dropdown">
                                    <a href="#" id='noFocus' className="dropdown-toggle" data-toggle="dropdown" style={{ 'color': "white", 'font-size': '15px' }}>Help <span class="caret"></span></a>
                                    <ul className="dropdown-menu">
                                        <li id="">
                                            <a href="#" className='Dropdown__menu Dropdown__menu--open Dropdown__menu--right dropList'  >Visit Help Center</a>
                                        </li>
                                        <li><a href="#" className='Dropdown__menu Dropdown__menu--open Dropdown__menu--right' style={{ 'padding': '10px' }}>Travelers</a></li>
                                        <li id="">
                                            <a href="#" className='Dropdown__menu Dropdown__menu--open Dropdown__menu--right dropList'  >How it works</a>
                                        </li>
                                        <li id="">
                                            <a href="#" className='Dropdown__menu Dropdown__menu--open Dropdown__menu--right dropList'  >Security Center</a>
                                        </li>
                                        <li><a href="#" className='Dropdown__menu Dropdown__menu--open Dropdown__menu--right' style={{ 'padding': '10px' }}>Homeowners</a></li>
                                        <li id="">
                                            <a href="#" className='Dropdown__menu Dropdown__menu--open Dropdown__menu--right dropList'  >How it works</a>
                                        </li>
                                        <li id="">
                                            <a href="#" className='Dropdown__menu Dropdown__menu--open Dropdown__menu--right dropList'  >List your property</a>
                                        </li>
                                        <li id="">
                                            <a href="#" className='Dropdown__menu Dropdown__menu--open Dropdown__menu--right dropList'  >Community</a>
                                        </li>
                                        <li id="">
                                            <a href="#" className='Dropdown__menu Dropdown__menu--open Dropdown__menu--right dropList'  >Discovery Hub</a>
                                        </li>

                                        <li><a href="#" className='Dropdown__menu Dropdown__menu--open Dropdown__menu--right' style={{ 'padding': '10px' }}>Property Managers</a></li>
                                        <li id="" >
                                            <a href="javascript.void(0)" className='Dropdown__menu Dropdown__menu--open Dropdown__menu--right dropList'  >
                                                List your property</a>

                                        </li>
                                    </ul>
                                </li>

                                <li style={{ marginRight: "15px" }}>
                                    <button type="button" className=" btn btn-default btn-round-lg btn-lg" href="#" id="searchButton">List your property</button>
                                </li>
                                <li style={{ marginRight: "15px" }}>
                                    <img alt="HomeAway birdhouse" src="//csvcus.homeaway.com/rsrcs/cdn-logos/2.11.0/bce/moniker/homeaway_us/birdhouse-bceheader-white.svg"></img>
                                </li>
                            </ul>
                            {/* {navLogin}s */}
                        </div>
                    </nav>

                    <div className="">
                        <div className="headingText">
                            <div> <span className="">Book beach houses, cabins,</span></div>
                            <div> <span className="">condos and more, worldwide</span></div>
                        </div>
                    </div>

                    <div className="">
                        <div >
                            <div className="searchContainer1" >
                                <form>
                                    <span className=""><input style={{ 'padding': '1.6%', 'margin-right': '10px', 'width': ' 30%', 'color': ' gray;' }} type="text" onChange={this.fieldChangeHandler} name="city" placeholder="Where do you want to go?" /></span>
                                    <span className=""><input style={{ 'padding': '1.6%', 'margin-right': '10px', 'width': ' 17%', 'color': ' gray;' }} type="date" onChange={this.fieldChangeHandler} name="tripStart" /></span>
                                    <span className=""><input style={{ 'padding': '1.6%', 'margin-right': '10px', 'width': ' 17%', 'color': ' gray;' }} type="date" onChange={this.fieldChangeHandler} name="tripEnd" /></span>
                                    <span className=""><input style={{ 'padding': '1.6%', 'margin-right': '10px', 'width': ' 14%', 'color': ' gray;' }} type="text" onChange={this.fieldChangeHandler} name="guests" placeholder="Guests" /></span>
                                    <span><button onClick={this.search} className="btn btn-primary btn-lg searchbox-submit js-searchSubmit searchButton" data-effect="ripple" type="button" tabindex="5" data-loading-animation="true">Search</button></span>
                                </form>
                            </div>
                        </div>
                    </div>

                    <div className="container-fluid">
                        <div className="row" style={{ 'margin-top': '10%', 'margin-bottom': '2%' }}>
                            <div className='col-md-4 smallInfo' >
                                <div className="smallFontInfo">Your whole vacation starts here</div>
                                <div className="smallestInfo">Choose a rental from the world's best selection</div>
                            </div>
                            <div className='col-md-4 smallInfo' >
                                <div className="smallFontInfo">Book and stay with confidence</div>
                                <div className="smallestInfo">Secure payments, peace of mind</div>
                            </div>
                            <div className='col-md-4 smallInfo' >
                                <div className="smallFontInfo">Your vacation your way</div>
                                <div className="smallestInfo">More space, more privacy, no compromises</div></div>
                        </div>
                    </div>

                </div>

            </div>
        )
    }
}

export default TravelerHome;