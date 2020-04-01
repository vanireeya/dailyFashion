import React, { Component } from 'react';
import OwnerLocation from '../OwnerLocation/OwnerLocation';
import OwnerDetails from '../OwnerDetails/OwnerDetails';
import OwnerPhotos from '../OwnerPhotos/OwnerPhotos';
import OwnerWelcome from '../OwnerWelcome/OwnerWelcome';
import OwnerPricing from '../OwnerPricing/OwnerPricing';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import axios from 'axios';
import logo from './1.jpg'
import logo2 from './2.jpg'
import logo3 from './3.jpg'
import { stat } from 'fs';
import { Link } from 'react-router-dom';
import {ADMIN_URL} from '../../constants/constants';



//create the Navbar Component
class OwnerListing extends Component {
    constructor(props) {
        super(props);
        let myData = JSON.parse(localStorage.getItem('myData'));
        this.state = {
            myData: myData,
            properties: [],
            Cimages: [],
            logout: false
        }
        this.handleLogout = this.handleLogout.bind(this)

    }

    componentDidMount() {

        // if (this.state.myData) {
        // axios.defaults.withCredentials = true;
        axios.get(`${ADMIN_URL}/inventory`)
            .then( (response) => {
                console.log(response.data);
                if (response.data && !response.data.status) {
                    let info = response.data
                    let temp;
                    for (let i = 0; i < response.data.length; i++) {
                        let tempProperty = response.data[i].Itempath;
                        // for (let j = 0; j < tempProperty.length; j++) {

                        //      axios.get('http://192.168.0.7:3000/download/' + tempProperty[j])
                        //         .then((resp) => {
                        //             // console.log(resp.data)
                        //             // response.data[i].Itempath[j] = new Uint8Array(resp.data)
                        //             // let temp = "'data:image/jpeg;base64," + resp.data
                        //             response.data[i].Itempath[j] = resp.data;

                        //         })

                        //     // let temp = 'data:image/jpg;base64, ' + response.data.property[i].showImages[j]
                        //     // response.data.property[i].showImages[j] = temp
                        // }
                        this.setState({
                            properties: response.data,


                        })
                    }


                }


            });
        // }

    }
    // handle logout to destroy the cookie and clear local storage
    handleLogout = () => {
        // cookie.remove('cookie', { path: '/' })
        localStorage.clear();
        this.setState({
            logout: true
        })
    }

    Cimages({ property }) {

        let details = property.Itempath.map((imgs, key) => {

            // var arrayBufferView = new Uint8Array( imgs );
            // var blob = new Blob( [ arrayBufferView ], { type: "image/jpeg" } );
            // var urlCreator = window.URL || window.webkitURL;
            // var imageUrl = urlCreator.createObjectURL( blob );
            // var binary_string = window.atob(imgs);
            // var len = binary_string.length;
            // var bytes = new Uint8Array(len);
            // for (var i = 0; i < len; i++) {
            //     bytes[i] = binary_string.charCodeAt(i);
            // }
            if (key == 0) {
                return (
                    <div style={{ overflow: "hidden" }} class="item active">
                        <img src={imgs} />
                    </div>
                )
            } else {
                return (
                    <div style={{ overflow: "hidden" }} class="item">
                        <img src={imgs} />
                    </div>
                )
            }
            // axios.get('http://192.168.0.7:3000/download/' + imgs)
            //     .then((resp) => {
            //         // console.log(resp.data)
            //         // imgs = resp.data
            //         if (key == 0) {
            //             return (
            //                 <div style={{ overflow: "hidden" }} class="item active">
            //                     <img src={resp.data} />
            //                 </div>
            //             )
            //         } else {
            //             return (
            //                 <div style={{ overflow: "hidden" }} class="item">
            //                     <img src={resp.data} />
            //                 </div>
            //             )
            //         }
            //     })


        })
        return details
    }

    render() {
        require('./OwnerListing.css')
        let redirectVar = null;

        if (this.state.logout) {
            localStorage.clear();
            redirectVar = <Redirect to="/" />
        } 
        // else {
        //     if (this.state.myData.type == "T") {
        //         redirectVar = <Redirect to="/TravelerHome" />
        //     }
        // }

        let propertyList;

        if (this.state.properties && this.state.properties.length > 0) {
            propertyList = this.state.properties.map(property => {
                return (
                    <tr className="trstyling" style={{ marginTop: "3%" }}>
                        <td className="tdStyling" style={{ width: "31%", padding: "10px" }}>
                            {/* <img src={property.showImages[1]} /> */}
                            <div style={{ width: "96%", "overflow": "hidden" }} id={"slider" + property.Itemid} class="carousel slide" data-ride="carousel">




                                <div class="carousel-inner">


                                    <this.Cimages property={property} />
                                </div>

                                <a class="left carousel-control" href={"#slider" + property.Itemid} data-slide="prev">
                                    <span class="glyphicon glyphicon-chevron-left"></span>
                                    <span class="sr-only">Previous</span>
                                </a>
                                <a class="right carousel-control" href={"#slider" + property.Itemid} data-slide="next">
                                    <span class="glyphicon glyphicon-chevron-right"></span>
                                    <span class="sr-only">Next</span>
                                </a>
                            </div>
                        </td>
                        <td className="tdStyling" style={{ width: "60%", padding: "10px" }}>
                            <div style={{ marginLeft: "10%" }}>
                                <div className="headingFont">{property.Itemname}</div>
                                {/* <div className="addressFont margin10">{property.street + " " + property.city + " " + property.state + " " + property.country} </div> */}
                                <div className="margin10 descFont" style={{ width: "50%" }}>{property.Itemdesc} </div>
                                <div className="margin10">
                                    <div>
                                        {/* <span className="spanDiv">{property.apt_type}</span> */}
                                        {/* <span className="marginLeft10 spanDiv"></span> */}
                                        <span className=" spanDiv">Quantity: {property.Quantity}</span>
                                        {/* <span className="marginLeft10 spanDiv">Sleeps {property.accomodates}</span> */}
                                    </div>
                                    <div>USD: {property.Price}</div>
                                    <div>Total Sold: {property.Sold}</div>
                                </div>
                            </div>
                        </td>
                        {/* <td>
                                        <button className="btn btn-primary">Details</button>
                                    </td> */}
                    </tr>
                    //    {testtr}
                )
            })
        } else {
            propertyList = <div style={{ color: "#200755", padding: "10px 10px 10px 0px" }}>
                <h2>You have not listed products yet!</h2>
            </div>
        }

        return (



            <div style={{ "backgroundColor": "#f7f7f8" }}>
                {redirectVar}
                <div id="mainDiv1">
                    <nav className="navbar navbar-expand-sm">
                        <div className="container-fluid" >
                            <div className="navbar-header" style={{ "marginLeft": "45px" }}>
                                <a className="navbar-brand" id="mainHeading2" href="/">Fashiop</a>
                            </div>

                            <ul className="nav navbar-nav navbar-right">


                                <li className="dropdown topNavBar  ">
                                    <a href="#" id='noFocus' className="dropdown-toggle" data-toggle="dropdown" style={{ marginRight: "10px", 'font-size': '16px', color: "gray" }}>
                                        <span>
                                            <img className="profileImg" src="https://csvcus.homeaway.com/rsrcs/cdn-logos/2.10.3/bce/brand/misc/default-profile-pic.png" />
                                        </span>
                                        <span style={{ "margin-left": "10px", "marginRight": "10px" }}>My Account</span>

                                        <span style={{ "margin-left": "5px" }} class="caret"></span>
                                    </a>
                                    <ul className="dropdown-menu" style={{ width: "100%", textAlign: "center", color: "gray" }}>
                                        <li id="">
                                            <a href="#" className='Dropdown__menu Dropdown__menu--open Dropdown__menu--right dropList'  >Account settings</a>
                                        </li>
                                        <li id="">
                                            <a href="/OwnerListing" className='Dropdown__menu Dropdown__menu--open Dropdown__menu--right dropList'  >Product Details</a>
                                        </li>
                                        <li id="">
                                            <a href="#" className='Dropdown__menu Dropdown__menu--open Dropdown__menu--right dropList'  >Product archive</a>
                                        </li>
                                        <li id="">
                                            <a href="/OwnerDashboard" className='Dropdown__menu Dropdown__menu--open Dropdown__menu--right dropList'  >Add a new product</a>
                                        </li>
                                        <li id="">
                                            <a href="#" onClick={this.handleLogout} className='Dropdown__menu Dropdown__menu--open Dropdown__menu--right dropList' > Sign out</a>
                                        </li>


                                    </ul>
                                </li>
                                <li className="dropdown iconStyle"><i style={{ marginTop: "10px" }} className="far fa-bell"></i>
                                </li>
                                {/* <li className="dropdown topNAvBar"><i class="far fa-bell"></i></li> */}


                            </ul>
                        </div>
                    </nav>
                </div>

                <div>
                    <div>
                        <div className="outerDiv11 mainHeadFont">Product Lists</div>
                        <div className="outerDiv">
                            <table style={{ marginTop: "10px", marginLeft: "16%" }}>

                                {propertyList}
                            </table>

                        </div>
                    </div>

                </div>


                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
            </div>


        )
    }
}

export default OwnerListing;









