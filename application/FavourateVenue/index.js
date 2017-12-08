import React, { Component } from 'react';
import { View, Text, AsyncStorage, TouchableOpacity, BackHandler } from 'react-native';
import { Button } from 'native-base';
import styles from './styles';
import { Actions } from 'react-native-router-flux';
import geolib from 'geolib';
import { Dropdown } from 'react-native-material-dropdown';
export default class FavourateVenue extends Component {
    constructor(props) {
        super(props);
        this.state = {
            venues: [],
            initialPosition: undefined,
            randomNumber: 0,
            favouriteItem: {},
            user: {}
        };
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', () => {
            Actions.login();
            return true;
        });
        this.initValues();
    }

    seeDetails = () => {
        Actions.favourateVenueDetails();
    }


    initValues = () => {
        AsyncStorage.getItem('user').then((usr) => {
            this.setState({ user: JSON.parse(usr) });
        });
        AsyncStorage.getItem('position').then((result) => {
            if (result) {
                this.setState({ initialPosition: JSON.parse(result) });
                this.getRelativeVenues();
            } else {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        this.setState({ initialPosition: position.coords });
                        this.getRelativeVenues();
                    }
                );
            }
        });
        AsyncStorage.getItem("venues").then((res) => {
            if (res) {
                this.setState({ venues: JSON.parse(res) });
            }
        });
        AsyncStorage.getItem('favourate').then((fav) => {
            if (fav) {
                let items = JSON.parse(fav);
                if (items.length > 0) {
                    let status = false;
                    items.forEach((item, k) => {
                        if (item.username === this.state.user.username) {
                            this.setState({ favouriteItem: item });
                            status = true;
                        }
                        if (k === items.length - 1 && !status) {
                            this.setFavourite();
                        }
                    });
                } else {
                    this.setFavourite();
                }
            } else {
                this.setFavourite();
            }
        });
    }

    getRelativeVenues = () => {
        setTimeout(() => {
            let items = this.state.venues;
            let setItems = {};
            items.forEach((item) => {
                if (item.location && item.location.address) {
                    let distance = geolib.getDistance(
                        { longitude: this.state.initialPosition.longitude, latitude: this.state.initialPosition.latitude },
                        { latitude: item.location.latitude, longitude: item.location.longitude }
                    );
                    item.value = item.name + ", " + item.location.address;
                    item.distance = distance;
                } else {
                    item.distance = null;
                    item.value = item.name;
                }
            });
            items = _.orderBy(items, ['distance'], ['asc']);
            this.setState({ venues: items });
        }, 500);
    }

    setFavourite = () => {
        let number = Math.floor(Math.random() * 3) + 1;
        let favItems = [];
        let favItem = this.state.venues[number];
        favItem.username = this.state.user.username
        favItems.push(favItem);
        this.setState({ favouriteItem: favItem });
        AsyncStorage.setItem('favourate', JSON.stringify(favItems));
    }

    onChangeText = (text, index, data) => {
        let favItem = this.state.venues[index];
        favItem.username = this.state.user.username;
        this.setState({ favouriteItem: favItem });
        AsyncStorage.getItem('favourate').then((fav) => {
            if (fav) {
                let items = JSON.parse(fav);
                if (items.length > 0) {
                    items.forEach((v, k) => {
                        if (v.username === favItem.username) {
                            v = favItem;
                            items[k] = v;
                            AsyncStorage.setItem('favourate', JSON.stringify(items));
                        }
                    });
                }
            }
        });
    }


    render() {
        return (
            <View style={styles.container}>
                <View style={styles.view}>
                    <Text style={styles.header}>Your Favorite Venue</Text>
                    <View style={styles.subView}>
                        <Text style={styles.label}> Name</Text>
                        <Text style={styles.name}> {this.state.favouriteItem && this.state.favouriteItem.name}</Text>
                    </View>
                    <View style={styles.subView}>
                        <Text style={styles.label}> Location </Text>
                        <Text style={styles.name}>{this.state.favouriteItem && this.state.favouriteItem.location && this.state.favouriteItem.location.address}</Text>
                    </View>
                    <View style={[styles.subView, { alignSelf: 'center' }]}>
                        <Button onPress={() => this.seeDetails()}><Text style={styles.label}> Info </Text></Button>
                    </View>
                    <Dropdown
                        labelHeight={50}
                        labelFontSize={18}
                        label='another favourite Location'
                        baseColor='#42a5f5'
                        data={this.state.venues}
                        onChangeText={this.onChangeText}
                    />
                </View>
            </View>
        )
    }
}