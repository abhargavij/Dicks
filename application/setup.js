import React, { Component } from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import Login from './Login';
import FavourateVenue from './FavourateVenue';
import VenueDetails from './VenueDetails';
export default class Setup extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Router>
                <Scene key="root">
                    <Scene key="login" component={Login} title="Login" type="replace" hideNavBar initial={true} />
                    <Scene key="favourateVenue" component={FavourateVenue} title="favourate venue" type="replace" hideNavBar />
                    <Scene key="favourateVenueDetails" component={VenueDetails} title="favourate venue details" type="replace" hideNavBar />
                </Scene>
            </Router>
        )
    }
}