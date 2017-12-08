import React, { Component } from 'react';
import { View, Text, AsyncStorage, Image, BackHandler } from 'react-native';
import { Actions } from 'react-native-router-flux';
import styles from './styles';
export default class VenueDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {},
            favouriteItem: {}
        };
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', () => {
            Actions.favourateVenue();
            return true;
        });
        AsyncStorage.getItem('user').then((usr) => {
            this.setUsername(usr);
        });
        AsyncStorage.getItem('favourate').then((fav) => {
            if (fav) {
                this.findFavourate(fav);
            }
        });
    }

    findFavourate = (fav) => {
        setTimeout(() => {
            let items = JSON.parse(fav);
            items.forEach((v) => {
                if (v.username === this.state.user.username) {
                    this.setFavourateItems(v);
                }
            });
        }, 200);
    }

    setUsername = (usr) => {
        this.setState({ user: JSON.parse(usr) });
    }

    setFavourateItems = (v) => {
        this.setState({ favouriteItem: v });
    }

    render() {
        return (
            <View style={styles.defaultView}>
                <View style={styles.subView}>
                    <Text style={styles.header}>Complete Info</Text>
                    <View style={styles.details}>
                        <Text style={styles.label}>Name:</Text>
                        <Text style={styles.text}>{this.state.favouriteItem && this.state.favouriteItem.name}</Text>
                    </View>
                    <View style={styles.details}>
                        <Text style={styles.label}>postalCode:</Text>
                        <Text style={styles.text}>{this.state.favouriteItem && this.state.favouriteItem.location && this.state.favouriteItem.location.postalCode}</Text>
                    </View>
                    <View style={styles.details}>
                        <Text style={styles.label}>city:</Text>
                        <Text style={styles.text}>{this.state.favouriteItem && this.state.favouriteItem.location && this.state.favouriteItem.location.city}</Text>
                    </View>
                    <View style={styles.details}>
                        <Text style={styles.label}>phone:</Text>
                        <Text style={styles.text}>{this.state.favouriteItem && this.state.favouriteItem.contacts && this.state.favouriteItem.contacts[0] && this.state.favouriteItem.contacts[0].phone}</Text>
                    </View>
                    <View style={styles.details}>
                        {this.state.favouriteItem && this.state.favouriteItem.photos && this.state.favouriteItem.photos[0] && this.state.favouriteItem.photos[0].url ? <Image style={styles.imageStyle} source={{ uri: this.state.favouriteItem.photos[0].url }} /> : null}
                    </View>
                </View>
            </View>
        )
    }
}

