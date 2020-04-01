import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'<FontAwesomeIcon icon="stroopwafel" />
// import './Navbar.css';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
// import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
// import '../../../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js'


//create the Navbar Component
class Navbar extends Component {
    constructor(props) {
        super(props);
        let myData = JSON.parse(localStorage.getItem('myData'));
        this.state = {
            myData: myData
        }
        // this.handleLogout = this.handleLogout.bind(this);
    }

    render() {
        require('./Navbar.css')
        let redirectVar = null;
        if (cookie.load('cookie') && this.state.myData) {
            if (this.state.myData.type === "T") {
                redirectVar = <Redirect to="/TravelerHome" />
            } else if (this.state.myData.type === "O") {
                redirectVar = <Redirect to="/OwnerDashboard" />
            }

        }
        //if Cookie is set render Logout Button
        // let navLogin = null;
        // if(cookie.load('cookie')){
        //     console.log("Able to read cookie");
        //     navLogin = (
        //         <ul class="nav navbar-nav navbar-right">
        //                 <li><Link to="/" onClick = {this.handleLogout}><span class="glyphicon glyphicon-user"></span>Logout</Link></li>
        //         </ul>
        //     );
        // }else{
        //     //Else display login button
        //     console.log("Not Able to read cookie");
        //     navLogin = (
        //         <ul class="nav navbar-nav navbar-right">
        //                 <li><Link to="/login"><span class="glyphicon glyphicon-log-in"></span> Login</Link></li>
        //         </ul>
        //     )
        // }
        // let redirectVar = null;
        // if(cookie.load('cookie')){
        //     redirectVar = <Redirect to="/home"/>
        // }
        return (
            <div>
                {redirectVar}


                <div id="mainDiv3">
                    <nav className="navbar navbar-expand-sm" style={{ "background-color": "rgba(233, 233, 233, 0.76)", "padding-bottom": '10px' }}>
                        <div className="container-fluid" style={{ marginTop: "10px" }}>
                            <div className="navbar-header">
                                <a className="navbar-brand " id="mainHeading3" href="#">Fashiop</a>
                            </div>

                            <ul className="nav navbar-nav navbar-right">
                                <li >
                                    <a href="#" id="noFocus" className="nav-headings" >Product Boards</a>
                                </li>


                                <li className="dropdown">
                                    <a href="#" id='noFocus' className="dropdown-toggle nav-headings" data-toggle="dropdown" style={{ 'color': "white", 'font-size': '15px' }}>Login <span class="caret"></span></a>
                                    <ul className="dropdown-menu">
                                        <li>
                                            <Link className='Dropdown__menu Dropdown__menu--open Dropdown__menu--right dropList' to={{ pathname: '/OwnerLogin', state: { type: 'U' } }}>
                                                <span > User Login</span>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link className='Dropdown__menu Dropdown__menu--open Dropdown__menu--right dropList' to={{ pathname: '/OwnerLogin', state: { type: 'A' } }}>
                                                <span > Admin Login</span>
                                            </Link>
                                        </li>
                                        {/* <li id="">
                                            <a href="/OwnerLogin" className='Dropdown__menu Dropdown__menu--open Dropdown__menu--right dropList'  >User Login</a>
                                        </li>
                                        <li><a href="/OwnerLogin" className='Dropdown__menu Dropdown__menu--open Dropdown__menu--right dropList' >Admin Login</a></li> */}
                                    </ul>
                                </li>

                                <li className="dropdown">
                                    <a href="#" id='noFocus' className="dropdown-toggle nav-headings" data-toggle="dropdown" style={{ 'color': "white", 'font-size': '15px' }}>Help <span class="caret"></span></a>
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
                                            <a href="#" className='Dropdown__menu Dropdown__menu--open Dropdown__menu--right dropList'  >Search for Products</a>
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
                                </li>

                                <li style={{ marginRight: "15px" }}>
                                    <button type="button" className=" btn btn-default btn-round-lg btn-lg" href="#" id="searchButton">Search for products</button>
                                </li>
                                <li style={{ marginRight: "15px" }}>
                                    <i className="fa fa-shopping-cart" style={{ 'font-size': '46px', 'color': 'black' }}></i>
                                    {/* <img alt="HomeAway birdhouse" src="//csvcus.homeaway.com/rsrcs/cdn-logos/2.11.0/bce/moniker/homeaway_us/birdhouse-bceheader-white.svg"></img> */}
                                </li>
                            </ul>
                            {/* {navLogin}s */}
                        </div>
                    </nav>

                    <div className="">
                        <div className="headingText">
                            <div> <span className="" style={{ color: "grey", fontFamily: "initial" }}>Dress to impress</span></div>
                            <div> <span className="" style={{ color: "grey", fontFamily: "initial" }}>Identify Your Current Audience</span></div>
                        </div>
                    </div>

                    <div className="">
                        <div >
                            <div className="" style={{ "marginTop": "8%" }}>
                                <form>
                                    {/* <span className=""><input style={{ 'padding': '1.6%', 'margin-right': '10px', 'width': ' 30%', 'color': ' gray;' }} type="text" placeholder="Where do you want to go?" /></span>
                                    <span className=""><input style={{ 'padding': '1.6%', 'margin-right': '10px', 'width': ' 17%', 'color': ' gray;' }} type="date" placeholder="Where do you wnat to go?" /></span>
                                    <span className=""><input style={{ 'padding': '1.6%', 'margin-right': '10px', 'width': ' 17%', 'color': ' gray;' }} type="date" placeholder="Where do you wnat to go?" /></span>
                                    <span className=""><input style={{ 'padding': '1.6%', 'margin-right': '10px', 'width': ' 14%', 'color': ' gray;' }} type="text" placeholder="Guests" /></span> */}
                                    <Link to={{ pathname: '/TravelerSearch', state: { type: 'A' } }}>
                                        {/* <span > Admin Login</span> */}
                                        <span><button className="btn btn-primary btn-lg searchbox-submit js-searchSubmit searchButton" data-effect="ripple" type="button" tabindex="5" data-loading-animation="true">View Collections</button></span>

                                    </Link>

                                </form>
                            </div>
                        </div>
                    </div>

                    <div className="container-fluid">
                        <div className="row" style={{ 'margin-top': '10%', 'margin-bottom': '2%' }}>
                            <div className='col-md-4 smallInfo' >
                                <div className="smallFontInfo">Your whole wardrobe starts here</div>
                                <div className="smallestInfo">Choose from the world's best selection</div>
                            </div>
                            <div className='col-md-4 smallInfo' >
                                <div className="smallFontInfo">Shop and stay with confidence</div>
                                <div className="smallestInfo">Secure payments, peace of mind</div>
                            </div>
                            <div className='col-md-4 smallInfo' >
                                <div className="smallFontInfo">Your wardrobe your way</div>
                                <div className="smallestInfo">Choose your own personal style </div></div>
                        </div>
                    </div>

                </div>

            </div>
        )
    }
}

export default Navbar;