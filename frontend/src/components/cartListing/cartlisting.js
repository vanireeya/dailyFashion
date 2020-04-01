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
import {ADMIN_URL, CART_URL} from '../../constants/constants';




//create the Navbar Component
class cartlisting extends Component {
    constructor(props) {
        super(props);
        let myData = JSON.parse(localStorage.getItem('myData'));
        this.state = {
            myData: myData,
            properties: [],
            Cimages: [],
            placedOrder:false
        }
        this.handleLogout = this.handleLogout.bind(this)
        this.placeOrder = this.placeOrder.bind(this)

    }

    

    componentDidMount() {

        // if (this.state.myData) {
        // axios.defaults.withCredentials = true;
        let temp = this.state.myData
        // axios.post('http://192.168.0.14:3000/getallcart/'+this.state.myData.userid)
        axios.post(`${CART_URL}/getallcart/`+this.state.myData.userId)
            .then( (response) => {
                console.log(response.data);
                if (response.data &&!response.data.status) {
                    let info = response.data
                    let temp;
                    let sum =0;
                    for (let i = 0; i < response.data.length; i++) {
                        response.data[i].Total=parseInt(response.data[i].price) * parseInt(response.data[i].quantity)
                        
                       sum+=response.data[i].Total
                    }
                    
                    this.setState({
                        properties: response.data,
                        FinalTotal: sum
                    })

                }


            });
        // }

    }

    
    placeOrder() {
        // let data ={
        //     itemid:"5ccb1c6ed85b54cec0824ec7",
        //     userid:this.state.myData.userId,
        //     quantity:1,
            
        // }
        axios.post(`${CART_URL}/orders/`+this.state.myData.userId)
        .then(response => {
            console.log("Status Code : ", response.status);
            if (response.status === 200) {
                console.log(response.data)
                if (response.data) {
                    if (response.data && !response.data.Status) {
                        alert("success!")
                        // let data ={
                        //     firstname: response.data.fname,
                        //     lastname: response.data.lname,
                        //     type: response.data.type,
                        //     userId: response.data.user_id,
                        //     email: response.data.email
                        // }
                        // localStorage.setItem('myData', JSON.stringify(data));
                        // let test = JSON.parse(localStorage.getItem('myData'));
                        // console.log(test.firstname);
                        this.setState({
                            // authFlag: true,
                            // invalidFlag: false,
                            // myData: test,
                            placedOrder:true
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
    }



    // handle logout to destroy the cookie and clear local storage
    handleLogout = () => {
        // cookie.remove('cookie', { path: '/' })
        localStorage.clear();
        this.setState({
            authFlag: true
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
                        <img src={`data:image/jpg;base64, ${imgs}`} />
                    </div>
                )
            } else {
                return (
                    <div style={{ overflow: "hidden" }} class="item">
                        <img src={`data:image/jpg;base64, ${imgs}`} />
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
        require('./cartListing.css')
        let redirectVar = null;

        if (this.state.placedOrder) {
            // localStorage.clear();
            redirectVar = <Redirect to="/orderListing" />
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
                        
                        <td className="tdStyling" style={{  padding: "10px" }}>
                            <div style={{ marginLeft: "10%" }}>
                                <div className="headingFont">{property.itemname}</div>
                                <div className="margin10 descFont" style={{ width: "50%" }}>{property.itemdesc} </div>
                                <div className="margin10">
                                    <div>
                                        <span className=" spanDiv">Quantity: {property.quantity}</span>
                                        </div>
                                    <div>USD: {property.price}</div>
                                </div>
                            </div>
                        </td>
                        <td>
                        <span className=" spanDiv">Total Price = {property.Total}</span>
                            

                        </td>
                    </tr>
                    //    {testtr}
                )
            })
        } else {
            propertyList = <div style={{ color: "#200755", padding: "10px 10px 10px 0px" }}>
                <h2>You have not products in your cart yet!</h2>
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
                                            <a href="/TravelerSearch" className='Dropdown__menu Dropdown__menu--open Dropdown__menu--right dropList'  >Product Details</a>
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
                        <div className="outerDiv11 mainHeadFont">Items in your cart!</div>
                        <div className="outerDiv">
                            <span className="headingFont" style={{ marginLeft: "30%" }}>Total Cart Value : {this.state.FinalTotal}</span>
                            <table style={{ marginTop: "10px", marginLeft: "30%", width:"30%" }}>

                                {propertyList}
                            </table>
                            <div style={{ textAlign: "center", marginLeft:"-12%",marginTop: "35px" }}>
                                    <button type="button" onClick={this.placeOrder} class="btn btn-primary" style={{ borderRadius: "27px" }} data-dismiss="modal">Place Order</button>
                            </div>
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

export default cartlisting;









