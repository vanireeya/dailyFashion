import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Login from './Login/Login';
import LoginOwner from './LoginOwner/LoginOwner';
import MytripTraveller from './MytripTraveller/MytripTraveller';
import AccountTraveller from './AccountTraveller/AccountTraveller';
import ProfileTraveller from './ProfileTraveller/ProfileTraveller';
import Navbar from './LandingPage/Navbar';
import TravelerHome from './TravelerHome/TravelerHome';
import OwnerDashboard from './OwnerDashboard/OwnerDashboard';
import SignUp from './SignUp/SignUp';
import OwnerListing from './OwnerListing/OwnerListing';
import TravelerSearch from './TravelerSearch/TravelerSearch';
import cartlisting from './cartListing/cartlisting';
import orderListing from './orderListing/orderlisting';
// import Login from './Login/Login';
//Create a Main Component
class Main extends Component {
    render() {
        return (
            <div>
                
                <Route exact path="/" component={Navbar} />
                <Route path="/TravelerLogin" component={Login} />
                <Route path="/OwnerLogin" component={LoginOwner} />
                <Route path="/TravelerHome" component={TravelerHome} />
                <Route path="/MytripTraveller" component={MytripTraveller} />
                <Route path="/ProfileTraveller" component={ProfileTraveller} />
                <Route path="/AccountTraveller" component={AccountTraveller} />
                <Route path="/OwnerDashboard" component={OwnerDashboard} />
                <Route path="/SignUp" component={SignUp} />
                <Route path="/OwnerListing" component={OwnerListing} />
                <Route path="/TravelerSearch" component={TravelerSearch} />
                <Route path="/cartListing" component={cartlisting} />
                <Route path="/orderListing" component={orderListing} />
                
            </div>
        )
    }
}
//Export The Main Component
export default Main;