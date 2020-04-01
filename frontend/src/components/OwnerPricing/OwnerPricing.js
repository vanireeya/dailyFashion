import React, { Component } from 'react';

class OwnerPricing extends Component {
    constructor(props) {
        super(props);
        let pricing = JSON.parse(localStorage.getItem("pricing"));
        if (pricing) {
            this.state = {
                availableFrom: pricing.availableFrom,
                availableTill: pricing.availableTill,
                rent: pricing.rent,
                errorFlag: ""
            }
        } else {
            this.state = {
                availableFrom: "",
                availableTill: "",
                rent: "",
                errorFlag: ""
            }
        }

        this.handleAvailableFrom = this.handleAvailableFrom.bind(this)
        this.handleAvailableTill = this.handleAvailableTill.bind(this)
        this.handleRent = this.handleRent.bind(this)
        this.submitForm = this.submitForm.bind(this)
        this.handleBack=this.handleBack.bind(this)
    }
    handleBack(){
        this.props.parentBack()
    }
    handleAvailableFrom(e) {
        this.setState({
            availableFrom: e.target.value
        })

    }
    handleAvailableTill(e) {
        this.setState({
            availableTill: e.target.value
        })

    }
    handleRent(e) {
        this.setState({
            rent: e.target.value
        })

    }
    submitForm() {
        if (this.state.availableFrom && this.state.availableTill && this.state.rent) {
            let pricing = {
                availableFrom: this.state.availableFrom,
                availableTill: this.state.availableTill,
                rent: this.state.rent
            }
            localStorage.setItem("pricing", JSON.stringify(pricing))
            this.props.parentSubmit(this.state.availableFrom, this.state.availableTill, this.state.rent)
        } else {
            this.setState({
                errorFlag: true
            })
        }
    }
    render() {
        let error
        if (this.state.errorFlag) {
            error = <div className="errorColm">
                <i style={{ color: "#ff4848" }} class="fa fa-exclamation-circle fonticons"></i>
                <div > You have entered text that is longer or shorter than we allow.</div>
            </div>
        }
        require('./OwnerPricing.css')
        return (
            <div className="formStyle">

                <div className="formHeading4">Select a starting point for setting up your availability </div>
                {error}
                <div className="formItems4" >
                    <div id="formLine4" className="availableBox1">
                        <div className="imageBox">
                            <div className="outerdiv">
                                <div className="padding1 fontstyling">Full calender availability</div>
                                <div className="padding1 subdiv2">Block out certain dates</div>
                            </div>
                            <div className="fontstyling">Perfect for full time rental properties or super flexible owners </div>
                        </div>
                        <div></div>
                    </div>
                    <div id="formLine4" style={{ marginLeft: "6%" }} className="availableBox2">
                        <div className="imageBox">
                            <div className="outerdiv">
                                <div className="padding1 fontstyling">Blocked calender availability</div>
                                <div className="padding1 subdiv2_2">Select the dates your property will be available</div>
                            </div>
                            <div className="fontstyling">Perfect for only listing a property during specific events or seasons </div>
                        </div>
                        <div></div>
                    </div>
                    <div>
                        <table >
                            {/* <table border="1"> */}
                            <tr>
                                <td className="padding2">Available from</td>
                                <td style={{ width: "50%" }}><input value={this.state.availableFrom}  style={{ 'padding': '5%', 'color': ' gray' }} onChange={this.handleAvailableFrom} type="date" /></td>
                            </tr>
                            <tr>
                                <td className="padding2">Available till</td>
                                <td style={{ width: "50%" }}><input value={this.state.availableTill} style={{ 'padding': '5%', 'color': ' gray' }} onChange={this.handleAvailableTill} type="date" /></td>
                            </tr>
                            <tr>
                                <td className="padding2">Nightly base Rate</td>
                                <td style={{ width: "50%" }}><input style={{ 'padding': '5%', 'color': ' gray' }} onChange={this.handleRent} placeholder={this.state.rent} type="number" /></td>
                            </tr>
                        </table>

                    </div>



                    <hr>
                    </hr>
                    <div style={{ textAlign: "center" }}>
                        <button className="btn btn-primary buttonStyling1" onClick={this.handleBack} id="backButton">Back</button>
                        <button className="btn btn-primary buttonStyling2" onClick={this.submitForm}>Submit</button>
                    </div>
                </div>
            </div>
        )
    }

}
export default OwnerPricing