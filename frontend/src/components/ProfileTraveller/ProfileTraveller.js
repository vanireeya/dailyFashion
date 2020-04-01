import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import HeaderTraveller from '../HeaderTraveller/HeaderTraveller'
// import {HeaderTraveller} from './HeaderTraveller'
// import FaEnvelope from 'react-icons/fa'
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import axios from 'axios';
// import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
// import '../../../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js'


//create the Navbar Component
class ProfileTraveller extends Component {
    constructor(props) {
        super(props);
        let myData = JSON.parse(localStorage.getItem('myData'));
        this.state = {
            myData: myData,
            fname: "",
            lname: "",
            desc: "",
            country: "",
            city: "",
            phoneno: "",
            company: "",
            school: "",
            hometown: "",
            languages: "",
            gender: "",
            errorFlag: false,
            updateSuccess: false,
            showImage: false,
            viewImagePreview: false,
            photos: "",
            imageView: "https://odis.homeaway.com/mda01/7f257b13-2434-404e-b967-285a6b7eca02.2.2",
            tempImage: "",
        }
        this.fieldChangeHandler = this.fieldChangeHandler.bind(this)
        this.updateProfile = this.updateProfile.bind(this)
        this.showImageUpload = this.showImageUpload.bind(this)
        this.cancelImageUpload = this.cancelImageUpload.bind(this)
        this.uploadImage = this.uploadImage.bind(this)
        this.browseImage = this.browseImage.bind(this)
        this.child = React.createRef();
    }
    componentDidMount() {
        // window.scrollTo(0, 0)
        axios.defaults.withCredentials = true;

        axios.get('http://localhost:3001/profile/' + this.state.myData.uid)
            .then((response) => {
                console.log(response.data);
                if (response.data.status == 1) {
                    let info = response.data.info
                    let imageView
                    if (info.profileImage) {
                        imageView = 'data:image/jpg;base64, ' + info.profileImage
                    } else {
                        imageView= "https://odis.homeaway.com/mda01/7f257b13-2434-404e-b967-285a6b7eca02.2.2"

                    }
                    this.setState({
                        fname: info.firstname,
                        lname: info.lastname,
                        desc: info.description,
                        city: info.city,
                        country: info.country,
                        company: info.company,
                        school: info.school,
                        hometown: info.hometown,
                        languages: info.languages,
                        gender: info.gender,
                        phoneno: info.phoneno,
                        imageView: imageView
                    })
                }


            });


        // axios.post('http://localhost:3001/download/' + 'test.jpg')
        //     .then(response => {
        //         console.log(response);
        //         console.log("Imgae Res : ", response);
        //         let imagePreview = 'data:image/jpg;base64, ' + response.data;
        //         this.setState({
        //             imageView: imagePreview
        //         })
        //     });
    }

    onImageChange = (e) => {
        this.setState({
            selectedFile: e.target.files[0],
            tempImage: URL.createObjectURL(e.target.files[0]),
            viewImagePreview: true,
            showImage: false
        })

    }

    browseImage = () => {
        this.setState({
            showImage: true,
            viewImagePreview: false,

        })
    }
    uploadImage() {
        const { description, selectedFile } = this.state;
        let formData = new FormData();

        formData.append('description', description);
        formData.append('photos', selectedFile);
        formData.set("uid", JSON.stringify(this.state.myData.uid))
        axios.defaults.withCredentials = true;

        axios.post('http://localhost:3001/updateProfilePic', formData)
            .then((result) => {
                console.log(result.data)
                if (result.data.status == 1) {
                    let tempData = JSON.parse(localStorage.getItem('myData'));
                    tempData.profileImage = result.data.info.fileName
                    localStorage.setItem('myData', JSON.stringify(tempData))
                    this.setState({
                        imageView: 'data:image/jpg;base64, ' + result.data.info.fileName
                    })
                    this.cancelImageUpload()
                    this.child.current.updateUserInfo();
                }

            });
    }
    showImageUpload() {
        if (this.state.showImage) {
            this.cancelImageUpload()
        } else {
            this.setState({
                showImage: true
            })
        }

    }
    cancelImageUpload() {
        this.setState({
            showImage: false,
            selectedFile: "",
            tempImage: "",
            viewImagePreview: false
        })
    }
    updateProfile() {
        let invalid = false;
        // if (this.state.phoneno) {
        //     if (!/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/.test(this.state.phoneno)) {
        //         invalid = true;
        //     }
        // }
        if (!invalid) {
            let data = {
                firstname: this.state.fname,
                lastname: this.state.lname,
                description: this.state.desc,
                country: this.state.country,
                company: this.state.company,
                school: this.state.school,
                hometown: this.state.hometown,
                languages: this.state.languages,
                gender: this.state.gender,
                city: this.state.city,
                phoneno: this.state.phoneno,
                uid: this.state.myData.uid
            }
            axios.defaults.withCredentials = true;
            axios.post('http://localhost:3001/updateProfile', data)
                .then(response => {
                    console.log("Status Code : ", response.status);
                    if (response.status === 200) {
                        console.log(response.data)
                        let tempData = JSON.parse(localStorage.getItem('myData'));
                        tempData.firstname = this.state.fname
                        tempData.lastname = this.state.lname
                        localStorage.setItem('myData', JSON.stringify(tempData))
                        this.setState({
                            updateSuccess: true
                        })

                        this.child.current.updateUserInfo();
                    } else {

                    }
                }, resp => {
                    if (resp.response && resp.response.data && resp.response.data.status === -1) {

                    }
                });
        } else {
            this.setState({
                errorFlag: true
            })
        }


    }
    fieldChangeHandler(e) {
        let changedVar = {}
        changedVar[e.target.name] = e.target.value
        this.setState(changedVar)
    }
    render() {
        require('./ProfileTraveller.css')
        let error, success, imgshow, imagePreview;
        if (this.state.errorFlag) {
            error = <div style={{ marginLeft: "20px", marginTop: "-9px", color: "#b80606" }}>Phone number must match format</div>

        } else {
            error = null
        }
        if (this.state.updateSuccess) {
            success = <div style={{ background: "rgba(24, 110, 3, 0.23)", "border-color": "#186e037a" }} className="errorColm123">
                <i style={{ color: "rgb(24, 110, 3)" }} class="far fa-check-circle fonticons123"></i>
                <div style={{ marginTop: "6px" }} >Your profile has been successfully updated.</div>
            </div>
        }
        if (this.state.showImage) {
            imgshow = (
                <div style={{ "margin-bottom": "3%" }}>
                    <form id="uploadForm"
                        enctype="multipart/form-data"
                        action="/api/photo"
                        className="selectImage"
                        method="post">
                        <label for="formInput" style={{ padding: "10%", "border": "none" }} className="btn btn-default center-block">
                            <input id="formInput" style={{ display: "none" }} type="file" onChange={this.onImageChange} name="selectedFile" accept="image/*" />
                            <span style={{ fontSize: "17px", color: "gray" }} >Select photos to upload</span>
                        </label>
                    </form>
                </div>
            )

        } else {
            imgshow = false

        }
        if (this.state.viewImagePreview) {
            imagePreview = (
                <div style={{ "margin-bottom": "3%" }}>
                    <div className="displayImage">
                        <img style={{ width: "75%%", height: "300px" }} src={this.state.tempImage}></img>
                    </div>
                    <div style={{ color: "#0d03a1", marginLeft: "25%", width: "50%", fontSize: "17px" }}>
                        <span style={{ float: "left", marginLeft: "12px", cursor: "pointer" }} onClick={this.browseImage}>Browse Computer</span>
                        <span style={{ marginLeft: "57%", cursor: "pointer" }} onClick={this.cancelImageUpload}>Cancel</span>
                        <span style={{ float: "right", marginRight: "12px", cursor: "pointer" }} onClick={this.uploadImage}>Save</span>
                    </div>
                </div>
            )
        } else {
            imagePreview = "";
        }
        return (
            <div>
                <HeaderTraveller ref={this.child} />
                <div style={{ "text-align": "center", marginTop: "2%" }}>
                    {imgshow}
                    {imagePreview}
                    <span> <img className="imgdiv" src={this.state.imageView} /></span>
                    <div style={{ marginTop: "-2%" }}>
                        <button className="editButton" onClick={this.showImageUpload}><i style={{ color: "#116db3", fontSize: "20px" }} className="fa fa-pencil" ></i></button>
                    </div>
                    <div>
                        <h2><b>{this.state.myData.firstname + " " + this.state.myData.lastname}</b></h2>
                        <div style={{ color: 'grey' }}>
                            Member since 2018
                        </div>
                    </div>
                </div>
                <div style={{ marginLeft: '7%', marginTop: "3%", marginBottom: "2%" }}>
                    <div className="profileForm">
                        <div className="pswdHeading"><b>Profile Information</b></div>
                        {success}
                        <div style={{ padding: "13px" }}>
                            <div>
                                <input style={{ marginTop: '18px' }} name="fname" value={this.state.fname} onChange={this.fieldChangeHandler} className="pwsdInput" placeholder="First name" type="text" id="pswd" />
                            </div>
                            <div>
                                <input style={{ marginTop: '18px' }} name="lname" onChange={this.fieldChangeHandler} className="pwsdInput" value={this.state.lname} placeholder="Last name" type="text" id="pswd" />
                            </div>
                            <div>
                                <input style={{ marginTop: '18px' }} className="pwsdInput" onChange={this.fieldChangeHandler} name="desc" value={this.state.desc} placeholder="About me" type="text" id="pswd" />
                            </div>
                            <div>
                                <input style={{ marginTop: '18px' }} maxLength="10" className="pwsdInput" onChange={this.fieldChangeHandler} name="phoneno" value={this.state.phoneno} placeholder="Phone number" type="number" id="pswd" />
                                {/* {error} */}
                            </div>
                            <div>
                                <input style={{ marginTop: '18px' }} className="pwsdInput" onChange={this.fieldChangeHandler} name="city" value={this.state.city} placeholder="My city" type="text" id="pswd" />
                            </div>
                            <div>
                                <input style={{ marginTop: '18px' }} className="pwsdInput" onChange={this.fieldChangeHandler} name="country" value={this.state.country} placeholder="My country" type="text" id="pswd" />
                            </div>
                            <div>
                                <input style={{ marginTop: '18px' }} className="pwsdInput" onChange={this.fieldChangeHandler} name="company" value={this.state.company} placeholder="Company" type="text" id="pswd" />
                            </div>
                            <div>
                                <input style={{ marginTop: '18px' }} className="pwsdInput" onChange={this.fieldChangeHandler} name="school" value={this.state.school} placeholder="School" type="text" id="pswd" />
                            </div>
                            <div>
                                <input style={{ marginTop: '18px' }} className="pwsdInput" onChange={this.fieldChangeHandler} name="hometown" value={this.state.hometown} placeholder="Hometown" type="text" id="pswd" />
                            </div>
                            <div>
                                <input style={{ marginTop: '18px' }} className="pwsdInput" onChange={this.fieldChangeHandler} name="languages" value={this.state.languages} placeholder="Languages" type="text" id="pswd" />
                            </div>
                            <div>
                                <input style={{ marginTop: '18px', marginBottom: "18px" }} onChange={this.fieldChangeHandler} name="gender" value={this.state.gender} className="pwsdInput" placeholder="Gender" type="text" id="pswd" />

                            </div>
                            <div style={{ textAlign: "center" }}>
                                <button className="btn btn-primary " style={{ "padding": "12px", "border-radius": "32px", "width": "11%" }} onClick={this.updateProfile}>Update</button>

                            </div>

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ProfileTraveller;