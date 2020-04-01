import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import HeaderTraveller from '../HeaderTraveller/HeaderTraveller'
import cookie from 'react-cookies';
import imgs from './homeimg.jpg'
import { Redirect } from 'react-router';
import axios from 'axios';
import {ADMIN_URL, CART_URL} from '../../constants/constants';



class TravelerSearch extends Component {
    constructor(props) {
        super(props);
        let myData = JSON.parse(localStorage.getItem('myData'));
        // if (this.props.location.state && this.props.location.state.property) {
        //     console.log(this.props.location.state.property)
        //     let response = this.props.location.state.property;
        //     for (let i = 0; i < response.length; i++) {
        //         let tempProperty = response[i].showImages;
        //         for (let j = 0; j < tempProperty.length; j++) {
        //             let temp = 'data:image/jpg;base64, ' + response[i].showImages[j]
        //             response[i].showImages[j] = temp
        //         }
        //     }
        //     this.state = {
        //         myData:myData,
        //         properties: response,
        //         bookProp: {},
        //         search: JSON.parse(this.props.location.state.search),
        //         authFlag:false
        //     }
        // } else {
            this.state = {
                myData:myData,
                properties: [],
                bookProp: {},
                // search: JSON.parse(this.props.location.state.search),
                authFlag:false,
                cartadded:false
            }
        // }
        // console.log(this.state.search)
        this.setBookProperty = this.setBookProperty.bind(this);
        this.CimagesPopUp = this.CimagesPopUp.bind(this);
        this.blockProperty = this.blockProperty.bind(this);
        this.addCart =  this.addCart.bind(this);
    }
    componentDidMount() {
       
            // axios.defaults.withCredentials = true;
            axios.get(`${ADMIN_URL}/inventory`)
                .then((response) => {
                    console.log(response.data);
                    if (response.data && !response.data.status) {
                        let info = response.data
                        let temp;
                        // for (let i = 0; i < response.data.length; i++) {
                        //     let tempProperty = response.data[i].Itempath;
                        //     for (let j = 0; j < tempProperty.length; j++) {
                        //         let temp = 'data:image/jpg;base64, ' + response.data.property[i].showImages[j]
                        //         response.data.property[i].showImages[j] = temp
                        //     }
                        // }
                        this.setState({
                            properties: response.data,

                            // imageView: 'data:image/jpg;base64, ' + info.profileImage
                        })

                    }


                });
       

    }

    blockProperty() {
        let data={
            pid:this.state.bookProp.pid,
            block_from:this.state.search.tripStart,
            block_to:this.state.search.tripEnd,
            email:this.state.myData.email
        }
        // axios.defaults.withCredentials = true;
        axios.post('http://localhost:3001/book_property', data)
            .then(response => {
                console.log("Status Code : ", response.status);
                if (response.status === 200) {
                    console.log(response.data)
                    this.setState({
                        authFlag:true
                    })
                } else {

                }
            }, resp => {
                if (resp.response && resp.response.data && resp.response.data.status === -1) {
                    alert("Oops!! something went wrong!")
                }
            });
    }


    setBookProperty(property) {
        console.log(property)
        this.setState({
            bookProp: property
        })
    }

    addCart(property) {
        console.log("HURRRAUUU")
        console.log(property)
        if(this.state.myData){
            let data ={
                itemid:property.Itemid,
                // itemid:"5ccb1c6ed85b54cec0824ec7",
                
                userid:this.state.myData.userId,
                quantity:"1"
            }
            axios.post(`${ADMIN_URL}/cart`, data)
            .then(response => {
                console.log("Status Code : ", response.status);
                if (response.status === 200) {
                    console.log(response.data)
                    if (response.data) {
                        if (!response.data.Status) {
                            
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
                                cartadded:true
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
        }else{
            alert("Please Login first")
        }
        
    }



    CimagesPopUp() {
        console.log(this.state.bookProp)

        if (this.state && this.state.bookProp && this.state.bookProp.Itempath) {
            console.log(this.state.bookProp)
            let details = this.state.bookProp.Itempath.map((imgs, key) => {
                console.log(key)
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
        } else {
            return null
        }

    }
    Cimages({ property }) {

        let details = property.Itempath.map((imgs, key) => {
            
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
        require('./TravelerSearch.css')

        let propertyList,redirectVar;
        if (this.state.properties && this.state.properties.length > 0) {
            propertyList = this.state.properties.map(property => {
                return (
                    <tr className="trstyling">
                        <td className="tdStyling" style={{ width: "31%", padding: "10px" }}>
                            {/* <img src={property.showImages[1]} /> */}
                            <div style={{ width: "96%", "overflow": "hidden" }} id={"slider" + property.Itemid} class="carousel slide" data-ride="carousel">

                                {/* <ol class="carousel-indicators">
                                    <li data-target={"#slider" + property.pid} data-slide-to="0" class="active"></li>
                                    <li data-target={"#slider" + property.pid} data-slide-to="1"></li>
                                    <li data-target={"#slider" + property.pid} data-slide-to="2"></li>
                                </ol> */}


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
                                        {/* <span className="spanDiv">{property.apt_type}</span>
                                        <span className="marginLeft10 spanDiv">{property.bedrooms}BR</span>
                                        <span className="marginLeft10 spanDiv">{property.bathrooms}BA</span>
                                        <span className="marginLeft10 spanDiv">Sleeps {property.accomodates}</span> */}
                                         {/* <span className=" spanDiv">Quantity: {property.Quantity}</span> */}
                                    </div>
                                    <div>USD: {property.Price}</div>
                                    {/* <div>Total Sold: {property.Sold}</div> */}
                                </div>
                            </div>
                        </td>
                        <td>
                            <button className="btn btn-primary" data-toggle="modal" onClick={() => {
                                this.setBookProperty(property)
                            }} data-target="#myModal">Quick View!</button>

                            <button className="btn btn-primary" style={{marginTop:'10px'}} onClick={() => {
                                this.addCart(property)
                            }} data-target="#myModal">Add To Cart!</button>
                        </td>
                    </tr>
                    //    {testtr}
                )
            })
        } else {
            propertyList = <div style={{ color: "#200755", padding: "10px 10px 10px 0px" }}>
                <h2>No products found for your search!</h2>
            </div>
        }

        if(this.state.cartadded){
            redirectVar = <Redirect to="/cartListing" />
            
        }
        return (
            <div >
                {redirectVar}

                <HeaderTraveller />
                <div>
                    <div>
                        <div className="outerDiv11 mainHeadFont">Product Lists</div>
                        <div className="outerDiv">
                            <table style={{ marginTop: "10px" }}>
                                {propertyList}
                            </table>
                        </div>
                    </div>

                </div>
                <div class="modal" id="myModal" style={{ marginTop: "-24px" }}>
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-body" >
                                <button type="button" class="close" style={{ marginRight: "0px" }} data-dismiss="modal">&times;</button>

                                <div style={{ width: "95%", "overflow": "hidden", height: "398px", marginLeft: "3%" }} class="carousel slide" id="MyCarousel">
                                    <div class="carousel-inner">
                                        <this.CimagesPopUp />
                                    </div>
                                    <a href="#MyCarousel" class="left carousel-control" data-slide="prev"><span class="icon-prev"></span></a>
                                    <a href="#MyCarousel" class="right carousel-control" data-slide="next"><span class="icon-next"></span></a>
                                </div>
                                <table style={{ marginTop: "10px" }}>
                                    <tr>
                                        <td className="popTr">
                                            {/* <div style={{ fontSize: "11px", color: "#7a868e" }}>{property.itemname}</div> */}
                                            {/* <div style={{ fontSize: "13px", color: "#0067db" }}>{this.state.search.tripStart}</div> */}
                                        </td>
                                        <td className="popTr">
                                            {/* <div style={{ fontSize: "11px", color: "#7a868e" }}>Check-out</div> */}
                                            {/* <div style={{ fontSize: "13px", color: "#0067db" }}>{this.state.search.tripEnd}</div> */}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="popTr" colSpan="2">
                                            {/* <div style={{ fontSize: "11px", color: "#7a868e" }}>guest</div> */}
                                            {/* <div style={{ fontSize: "13px", color: "#0067db" }}>{this.state.search.guests}</div> */}
                                        </td>
                                    </tr>
                                </table>

                                {/* <div style={{ marginTop: "10px", marginLeft: "0" }}>
                                    <span style={{ fontSize: "17px", float: "left", marginLeft: "10px" }} className="fontDesign">${this.state.bookProp.rent}.00 x {this.state.bookProp.days} nights</span>
                                    <span style={{ fontSize: "17px", float: "right", marginRight: "10px" }} className="fontDesign"> ${this.state.bookProp.totalCost}.00</span>
                                </div> */}
                                {/* <div style={{ marginTop: "2px",marginLeft:"1.3%" }}>
                                    <span style={{ fontSize: "17px" }}>Days:</span>
                                    <span style={{ fontSize: "17px" }}> {this.state.bookProp.days}</span>
                                </div>
                                <div style={{ marginTop: "2px" ,marginLeft:"1.3%"}}>
                                    <span style={{ fontSize: "17px" }}>Total: </span>
                                    <span style={{ fontSize: "17px" }}>${this.state.bookProp.totalCost}</span>
                                </div> */}
                                {/* <div style={{ textAlign: "center", marginTop: "35px" }}>
                                    <button type="button" onClick={this.blockProperty} class="btn btn-primary" style={{ borderRadius: "27px" }} data-dismiss="modal">Book Now</button>
                                </div> */}
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default TravelerSearch;