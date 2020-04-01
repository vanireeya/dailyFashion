import React, { Component } from 'react';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';


//create the Navbar Component
class HeaderTraveller extends Component {
    constructor(props) {
        super(props);
        let myData = JSON.parse(localStorage.getItem('myData'));
        this.state = {
            myData: myData,
            authFlag: false,
            loggedOut: false,
            imgView: "https://csvcus.homeaway.com/rsrcs/cdn-logos/2.10.3/bce/brand/misc/default-profile-pic.png"

        }
        this.handleLogout = this.handleLogout.bind(this);
        this.handleImageChange = this.handleImageChange.bind(this)
        this.updateUserInfo = this.updateUserInfo.bind(this)
    }
    // handle logout to destroy the cookie and clear local storage
    handleLogout = () => {
        // cookie.remove('cookie', { path: '/' })
        localStorage.clear();
        this.setState({
            loggedOut: true
        })
    }
    componentDidMount() {
        // this.handleImageChange()
    }
    handleImageChange = () => {
        if (this.state.myData.profileImage) {
            let imagePreview = 'data:image/jpg;base64, ' + this.state.myData.profileImage;
            this.setState({
                imgView: imagePreview
            })
        }
    }

    updateUserInfo = () => {
        let myData = JSON.parse(localStorage.getItem('myData'));
        this.setState({
            myData: myData
        })
        this.handleImageChange()
    }
    render() {
        let redirectVar;
        require('./HeaderTraveller.css')
        if (this.state.loggedOut) {
            redirectVar = <Redirect to="/" />
        }
        // if (!cookie.load('cookie') || !this.state.myData) {
        //     localStorage.clear();
        //     redirectVar = <Redirect to="/" />
        // }
        return (



            <div>
                {redirectVar}
                <div id="mainDiv1">
                    <nav className="navbar navbar-expand-sm">
                        <div className="container-fluid" style={{ marginTop: "15px" }}>
                            <div className="navbar-header">
                                <a className="navbar-brand" style={{ marginTop: '1px' }} id="mainHeading1" href="/">Fashiop</a>
                            </div>

                            <ul className="nav navbar-nav navbar-right">
                                <li >
                                    <a href="#" id="noFocus" style={{ 'color': "#2a6ebb", 'font-size': '15px', marginRight: '-4px' }}>Product Boards</a>
                                </li>


                                <li className="dropdown">
                                    <a href="#" id='noFocus' className="dropdown-toggle" data-toggle="dropdown" style={{ 'color': "#2a6ebb", 'font-size': '15px' }}>
                                        <span><img className="profileImg" src={this.state.imgView} /></span>
                                        {/* {this.state.myData.firstname}  */}
                                        <span class="caret">
                                        </span></a>
                                    <ul className="dropdown-menu">
                                        <li id="">
                                            <a href="#" className='Dropdown__menu Dropdown__menu--open Dropdown__menu--right dropList'  ><i className="far fa-envelope" style={{ 'margin-right': '7px', 'color': 'grey' }}></i>Inbox</a>
                                        </li>
                                        <li id="">
                                            <a href="/orderlisting" className='Dropdown__menu Dropdown__menu--open Dropdown__menu--right dropList'  ><i className="fa fa-suitcase" style={{ 'margin-right': '7px', 'color': 'grey' }}></i>My Orders</a>
                                        </li>
                                        <li id="">
                                            <a href="/ProfileTraveller" className='Dropdown__menu Dropdown__menu--open Dropdown__menu--right dropList'  ><i className="fa fa-user" style={{ 'margin-right': '7px', 'color': 'grey' }}></i>My profile</a>
                                        </li>
                                        <li id="">
                                            <a href="/AccountTraveller" className='Dropdown__menu Dropdown__menu--open Dropdown__menu--right dropList'  ><i className="fa fa-cog" style={{ 'margin-right': '7px', 'color': 'grey' }}></i>Account</a>
                                        </li>
                                        {/* <li id="">
                                            <a href="#" className='Dropdown__menu Dropdown__menu--open Dropdown__menu--right dropList'  ><i className="fa fa-co" style={{'margin-right':'7px','color':'grey'}}></i>Owner Dashboard</a>
                                        </li> */}
                                        <li id="">
                                            <a href="#" onClick={this.handleLogout} className='Dropdown__menu Dropdown__menu--open Dropdown__menu--right dropList'  ><span class="glyphicon glyphicon-log-out" style={{ 'margin-right': '7px', 'color': 'grey' }}></span>Logout</a>
                                        </li>


                                    </ul>
                                </li>
                                {/* <li className="dropdown iconStyle"><i className="far fa-envelope"></i>
                                </li> */}

                                {/* <li className="dropdown">
                                    <a href="#" id='noFocus' className="dropdown-toggle" data-toggle="dropdown" style={{ 'color': "#2a6ebb", 'font-size': '15px' }}>Help <span class="caret"></span></a>
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
                                        <li id="">
                                            <a href="#" className='Dropdown__menu Dropdown__menu--open Dropdown__menu--right dropList'  >List your property</a>
                                        </li>
                                    </ul>
                                </li> */}

                                {/* <li style={{ marginRight: "15px" }}>
                                    <button type="button" className=" btn btn-default btn-round-lg btn-lg" href="#" id="searchButton">List your property</button>
                                </li> */}
                                <li style={{ marginRight: "15px" }}>
                                    <Link to={{ pathname: '/CartListing', state: { type: 'U' } }}>
                                        <i className="fa fa-shopping-cart" style={{ 'font-size': '46px', 'color': 'black' }}></i>
                                        {/* <span > User Login</span> */}
                                    </Link>
                                    {/* <img alt="HomeAway birdhouse" src="//csvcus.homeaway.com/rsrcs/cdn-logos/2.11.0/bce/moniker/homeaway_us/birdhouse-bceheader.svg"></img> */}
                                </li>
                            </ul>
                            {/* {navLogin}s */}
                        </div>
                    </nav>
                </div>
                <div id="mainDiv1" style={{ "padding": "8px" }}>
                    {/* <nav className="navbar navbar-expand-sm"> */}
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <a className="navbar-brand" id="mainHeading1" href="#"></a>
                        </div>
                        <ul className="nav navbar-nav ">
                            <li >
                                <a href="#" id="secNav">Inbox</a>
                            </li>
                            <li >
                                <a href="/orderlisting" id='secNav' >My Orders </a>
                            </li>
                            {/* <li >
                                <a href="/ProfileTraveller" id='secNav' >Profile</a>
                            </li>
                            <li >
                                <a href="/AccountTraveller" id='secNav' >Account</a>
                            </li> */}
                        </ul>
                    </div>
                </div>
            </div>

        )
    }
}

export default HeaderTraveller;