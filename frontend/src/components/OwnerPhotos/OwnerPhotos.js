import React, { Component } from 'react';

import axios from 'axios';

class OwnerPhotos extends Component {
    constructor(props) {
        super(props)
        this.state = {
            photos: "",
            errorFlag: false,
            fileCount: 0
        }
        this.submitPhotos = this.submitPhotos.bind(this)
        this.handleBack = this.handleBack.bind(this)
        this.onImageChange = this.onImageChange.bind(this)
    }
    onImageChange = (e) => {
        console.log(e.target.files.length)
        if (e.target.files.length >= 2 && e.target.files.length <= 5) {
            this.setState({
                photos: e.target.files,
                errorFlag: false,
                fileCount: e.target.files.length
            })
        } else {
            this.setState({
                errorFlag: true
            })
        }
    }
    handleBack() {
        this.props.parentBack()
    }
    submitPhotos() {
        if (!this.state.errorFlag) {
            let formData = new FormData();
            for (let i = 0; i < this.state.photos.length; i++) {
                formData.append('photos', this.state.photos[i]);
            }
            // let temp = {
            //     "name": "ajadhk"
            // }
            // formData.set("location", JSON.stringify({ "name": "value" }))
            // console.log(formData)
            // axios.post('http://localhost:3001/test', formData)
            //     .then((result) => {
            //         // access results...
            //     });
            // localStorage.setItem('photos', formData);
            this.props.parentSubmit(formData)
        }
    }
    render() {
        require('./OwnerPhotos.css')
        let error = null, fileselect = null;
        if (this.state.errorFlag) {
            error = <div className="errorColm5">
                <i style={{ color: "#ff4848" }} class="fa fa-exclamation-circle fonticons"></i>
                <div style={{ marginTop: "5px" }} > You must select minimum 2 and maximum 5 photoss.</div>
            </div>
            fileselect = ""

        } else {
            error = "";
            fileselect = <div>You have selected {this.state.fileCount} files</div>
        }
        return (
            <div className="formStyle3">
                <div className="formHeading3">Add up to 5 photos of your property </div>
                <div className="formItems3" >
                    {error}
                    <div id="formLine3">
                        Showcase your property’s best features (no pets or people, please). Requirements: JPEG, at least 1920 x 1080 pixels, less than 20MB file size, 6 photos minimum. Need photos? Hire a professional.
                    </div>

                    {/* <div className="imageStyle">
                        <form id="uploadForm"
                            enctype="multipart/form-data"
                            action="/api/photo"
                            method="post">
                            <input id="formInput" type="file" onChange={this.onImageChange} name="selectedFile" placeholder="Headline" multiple accept="image/*" />
                        </form>
                    </div> */}
                    <div className="imageStyle">
                        <form id="uploadForm"
                            enctype="multipart/form-data"
                            action="/api/photo"
                            method="post">
                            <label for="formInput" style={{ padding: "10%", "border": "none" }} className="btn btn-default center-block">
                                <input id="formInput" style={{ display: "none" }} type="file" onChange={this.onImageChange} name="selectedFile" placeholder="Headline" multiple accept="image/*" />
                                <span style={{ fontSize: "17px", color: "gray" }} >Select photos to upload</span>
                                {fileselect}
                            </label>
                        </form>
                    </div>


                    {/* <hr>
                    </hr> */}
                    <div style={{ textAlign: "center", marginTop:"25px" }}>
                        {/* <button className="btn btn-primary buttonStyling1" onClick={this.handleBack} id="backButton">Back</button> */}
                        <button className="btn btn-primary buttonStyling2" style={{backgroundColor:"white",color:"black","width":"21%"}} onClick={this.submitPhotos}>Save and Submit </button>
                    </div>
                </div>
            </div>
        )
    }

}
export default OwnerPhotos