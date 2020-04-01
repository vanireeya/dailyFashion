import React, { Component } from 'react';

class OwnerLocation extends Component {
    constructor(props) {
        super(props);
        let location = JSON.parse(localStorage.getItem("location"))
        console.log(location)

        if (location) {
            this.state = {
                country: location.country,
                street: location.street,
                city: location.city,
                state: location.state,
                zipcode: location.zipcode,
                errorFlag: false,
                submittedError: false
            }
        } else {
            this.state = {
                country: "",
                street: "",
                city: "",
                state: "",
                zipcode: "",
                errorFlag: false,
                submittedError: false
            }
        }
        this.handleCountryChange = this.handleCountryChange.bind(this)
        this.handleStreetChange = this.handleStreetChange.bind(this)
        this.handleCityChange = this.handleCityChange.bind(this)
        this.handleStateChange = this.handleStateChange.bind(this)
        this.handleZipcodeChange = this.handleZipcodeChange.bind(this)
        this.submitForm = this.submitForm.bind(this);
    }
    componentDidMount() {
        
    }
    handleCountryChange(e) {
        this.setState({
            country: e.target.value
        })
    }
    handleStreetChange(e) {
        this.setState({
            street: e.target.value
        })
    }
    handleCityChange(e) {
        this.setState({
            city: e.target.value
        })
    }

    handleStateChange(e) {
        this.setState({
            state: e.target.value
        })
    }
    handleZipcodeChange(e) {
        this.setState({
            zipcode: e.target.value
        })
    }
    submitForm() {
        if (this.state.country && this.state.street && this.state.city && this.state.state && this.state.zipcode) {

            let location = {
                country: this.state.country,
                street: this.state.street,
                city: this.state.city,
                state: this.state.state,
                zipcode: this.state.zipcode
            }
            localStorage.setItem('location', JSON.stringify(location));
            this.props.parentSubmit(this.state.country, this.state.street, this.state.city, this.state.state, this.state.zipcode)
        } else {
            this.setState({
                errorFlag: true
            })
        }
    }
    render() {
        let error;
        if (this.state.errorFlag) {
            error = <div className="errorColm23">
                <i style={{ color: "#ff4848" }} class="fa fa-exclamation-circle fonticons"></i>
                <div > You have entered text that is longer or shorter than we allow.</div>
            </div>
        }
        // if (this.state.submittedError) {
        //     error = <div className="errorColm23">
        //         <i style={{ color: "#ff4848" }} class="fa fa-exclamation-circle fonticons"></i>
        //         <div > Complete the following details before submitting the form</div>
        //     </div>
        // }
        require('./OwnerLocation.css')

        return (
            <div className="formStyle">
                <div className="formHeading">Verify the location of your rental </div>
                {/* <div className="formItems" >
                    <div id="formLine">
                        Address:
                    </div>
                    <div>
                        <input id="formInput" type="text" placeholder="Enter Address" />

                    </div>
                </div> */}

                <div style={{ marginLeft: "10%" }}>
                    {error}
                    <div className="margintop45">
                        <div><span className="labelStyle1">Country</span></div>
                        <input className="stylings" onChange={this.handleCountryChange} style={{ width: "88.2%" }} placeholder={this.state.country} type="text" />
                    </div>
                    <div className="margintop45">
                        <div><span className="labelStyle1">Street Address</span></div>
                        <input className="stylings" onChange={this.handleStreetChange} style={{ width: "88.2%" }} placeholder={this.state.street} type="text" />
                    </div>
                    <div className="margintop45">
                        <div><span className="labelStyle1">City</span></div>
                        <input className="stylings" onChange={this.handleCityChange} style={{ width: "88.2%" }} placeholder={this.state.city} type="text" />
                    </div>
                    <div className="margintop45">
                        <div><span className="labelStyle1">State</span></div>
                        <input className="stylings" onChange={this.handleStateChange} style={{ width: "88.2%" }} placeholder={this.state.state} type="text" />
                    </div>
                    <div className="margintop45">
                        <div><span className="labelStyle1">Zip Code</span></div>
                        <input className="stylings" onChange={this.handleZipcodeChange} style={{ width: "88.2%" }} placeholder={this.state.zipcode} type="number" />
                    </div>
                </div>
                <div style={{ textAlign: "center", "marginTop": "20px" }}>
                    {/* <button className="btn btn-primary buttonStyling1" id="backButton">Back</button> */}
                    <button className="btn btn-primary buttonStyling2" onClick={this.submitForm}>Next</button>
                </div>
            </div>
        )
    }

}
export default OwnerLocation