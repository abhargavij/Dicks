import React, { Component } from 'react';
import { View, Text, TouchableOpacity, AsyncStorage, BackHandler } from 'react-native';
import { Container, Content, Input, Item, Button } from 'native-base';
import commonService from '../../service/services';
import { Actions } from 'react-native-router-flux';
import styles from './styles';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: null,
            password: null,
            errorMessage: null
        }
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', () => {
            Actions.login();
            return true;
        });
        AsyncStorage.setItem("position", JSON.stringify({}));
        navigator.geolocation.getCurrentPosition(
            (position) => {
                AsyncStorage.setItem("position", JSON.stringify(position.coords));
            }
        );
    }

    submit = () => {
        let users = [{
            username: 'admin',
            password: 'password',
        },
        {
            username: 'saketh',
            password: 'password',
        },
        {
            username: 'sandy',
            password: 'password',
        }];
        if (this.state.username && this.state.password) {
            let index = _.findIndex(users, (o) => { return o.username == this.state.username.toString(); });
            if (index > -1) {
                if (users[index].password === this.state.password.toString()) {
                    this.setState({ errorMessage: "Please wait ...." });
                    commonService.getVenues().then((response) => {
                        AsyncStorage.setItem("user", JSON.stringify(users[index]));
                        AsyncStorage.setItem("venues", JSON.stringify(response.venues));
                        Actions.favourateVenue();
                    });
                } else {
                    this.setState({ errorMessage: "Invalid password" });
                }
            } else {
                this.setState({ errorMessage: "Invalid user name" });
            }
        } else if (!this.state.username) {
            this.setState({ errorMessage: "Enter user name" });
        } else if (!this.state.password) {
            this.setState({ errorMessage: "Enter Password" });
        }

    }

    render() {
        return (
            <View style={styles.defaultContainer}>
                <View style={styles.loginContainer}>
                    <Text style={styles.loginHeading}>Login</Text>
                </View>
                <View style={styles.mainLoginContainer}>
                    <Item>
                        <Input placeholder="Username" placeholderTextColor="#d3d3d3" keyboardType={"email-address"} onChangeText={(text) => this.setState({ username: text })} />
                    </Item>
                    <Item >
                        <Input placeholder="Password" placeholderTextColor="#d3d3d3" secureTextEntry={true} onChangeText={(text) => this.setState({ password: text })} />
                    </Item>
                    <View style={styles.buttonStyle}>
                        <Button style={styles.buttonStyles} onPress={() => this.submit()}><Text> Login </Text></Button>
                    </View>
                    <View style={styles.buttonStyle}>
                        <Text style={styles.errorMessage}>{this.state.errorMessage}</Text>
                    </View>
                </View>
            </View>
        )
    }
}