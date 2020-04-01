import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import HeaderTraveller from '../HeaderTraveller/HeaderTraveller'
import axios from 'axios';

// import {HeaderTraveller} from './HeaderTraveller'
// import FaEnvelope from 'react-icons/fa'
import cookie from 'react-cookies';
import imgs from './homeimg.jpg'

import { Redirect } from 'react-router';
// import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
// import '../../../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js'

var property = {
    name: "sdalkf",
    pid: 3

}
//create the Navbar Component
class MytripTraveller extends Component {
    constructor(props) {
        super(props);
        let myData = JSON.parse(localStorage.getItem('myData'));
        this.state = {
            myData: myData,
            property: {

                name: "sdalkf",
                pid: 3

            }
        }
    }
    componentDidMount() {
        if (this.state.myData) {
            axios.defaults.withCredentials = true;
            axios.get('http://localhost:3001/getTrips/' + this.state.myData.email)
                .then((response) => {
                    console.log(response.data);
                    if (response.data.status == 1) {
                        for (let i = 0; i < response.data.property.length; i++) {
                            let tempProperty = response.data.property[i].showImages;
                            for (let j = 0; j < tempProperty.length; j++) {
                                let temp = 'data:image/jpg;base64, ' + response.data.property[i].showImages[j]
                                response.data.property[i].showImages[j] = temp
                            }
                        }
                        this.setState({
                            properties: response.data.property,
                        })

                    }


                });
        }
    }

    Cimages({ property }) {

        let details = property.showImages.map((imgs, key) => {
            // console.log(key)
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

        })
        return details
    }
    render() {
        require('./MytripTraveller.css')
        let propertyList;

        if (this.state.properties && this.state.properties.length > 0) {
            propertyList = this.state.properties.map(property => {
                return (
                    <tr className="trstyling">
                        <td className="tdStyling" style={{ width: "31%", padding: "10px" }}>
                            {/* <img src={property.showImages[1]} /> */}
                            <div style={{ width: "96%", "overflow": "hidden" }} id={"slider" + property.pid} class="carousel slide" data-ride="carousel">

                                {/* <ol class="carousel-indicators">
                                    <li data-target={"#slider" + property.pid} data-slide-to="0" class="active"></li>
                                    <li data-target={"#slider" + property.pid} data-slide-to="1"></li>
                                    <li data-target={"#slider" + property.pid} data-slide-to="2"></li>
                                </ol> */}


                                <div class="carousel-inner">


                                    <this.Cimages property={property} />
                                </div>

                                <a class="left carousel-control" href={"#slider" + property.pid} data-slide="prev">
                                    <span class="glyphicon glyphicon-chevron-left"></span>
                                    <span class="sr-only">Previous</span>
                                </a>
                                <a class="right carousel-control" href={"#slider" + property.pid} data-slide="next">
                                    <span class="glyphicon glyphicon-chevron-right"></span>
                                    <span class="sr-only">Next</span>
                                </a>
                            </div>
                        </td>
                        <td className="tdStyling" style={{ width: "60%", padding: "10px" }}>
                            <div style={{ marginLeft: "10%" }}>
                                <div className="headingFont">{property.headline}</div>
                                <div className="addressFont margin10">{property.street + " " + property.city + " " + property.state + " " + property.country} </div>
                                <div className="margin10 descFont" style={{ width: "50%" }}>{property.description} </div>
                                <div className="margin10">
                                    <div>
                                        <span className="spanDiv">{property.apt_type}</span>
                                        <span className="marginLeft10 spanDiv">{property.bedrooms}BR</span>
                                        <span className="marginLeft10 spanDiv">{property.bathrooms}BA</span>
                                        <span className="marginLeft10 spanDiv">Sleeps {property.accomodates}</span>
                                    </div>
                                    <div>USD: ${property.rent} per night</div>
                                    <div>Booking From: <b>{property.block_from}</b> - <b>{property.block_to}</b></div>
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
                <h2>No trips yet!</h2>
            </div>
        }
        return (
            <div>
                {/* {redirectVar} */}

                <HeaderTraveller />
                <div>
                    <div style={{marginTop:"18px"}}>
                        <div className="outerDiv11 mainHeadFont">Your trips...</div>
                        <div className="outerDiv">
                            <table style={{ marginTop: "10px" }}>

                                {propertyList}
                            </table>

                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

export default MytripTraveller;