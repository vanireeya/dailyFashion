import React, { Component } from 'react';

class OwnerWelcome extends Component {
    constructor(props) {
        super(props)
        this.changeView = this.changeView.bind(this)
    }
    changeView() {
        this.props.parentSubmit(2)
    }
    render() {
        require('./OwnerWelcome.css')
        return (
            <div style={{ marginTop: "10%", width: "63%" }}>
                <div>
                    <h1 className="mainFont"> Welcome! Continue the listing process</h1>
                </div>
                <div className="secondaryFont">
                    Just few steps remaining
                </div>
                <div>
                    <button className="btn  buttonStyling3" onClick={this.changeView}>Continue</button>
                </div>
            </div>
        )
    }

}
export default OwnerWelcome