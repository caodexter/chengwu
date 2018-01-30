import React, { Component } from 'react';
import { StackNavigator, } from 'react-navigation';
import {
    View,
    ActivityIndicator,
    StyleSheet,
    Text,
    ScrollView,
    TextInput,
    Button,
    Alert,
} from 'react-native';
import Tabbar from '../component/tabbar';
import styles from '../config/style';
let Dimensions = require('Dimensions');
const hwidth = Dimensions.get('window').width;
const hheight = Dimensions.get('window').height;
import Cimages from '../config/images';
import Mconfig from '../config/mconfig';
import Global from '../config/global';

let HOT_CXD_URL = `${Mconfig.BaseUrlC}/api/users`;


export default class me extends Component {
    constructor(props) {
        super(props)
        this.state = {
            uid: '',
            pwd: '',
            loaded: false,
        }
    }
    static navigationOptions = ({ navigation }) => ({
        title: '登录',
    });
    render() {
        const { navigate } = this.props.navigation

        if (!this.state.loaded) {
            return (
                <View style={styles.container}>
                    <ScrollView style={styles.container}>
                        <View style={{ height: hheight / 3, alignSelf: 'center', marginTop: 10, }}>
                            <View style={{ flexDirection: 'row', marginTop: 10, }}>
                                <Text >UserName:</Text>
                                <TextInput style={{ backgroundColor: '#ffffff', width: 200 }}
                                    onChangeText={(text) => {
                                        this.setState({
                                            uid: text
                                        })
                                    }}
                                    value={this.state.uid}></TextInput>
                            </View>
                            <View style={{ flexDirection: 'row', marginTop: 10, }}>
                                <Text >Password:</Text>
                                <TextInput 
                                style={{ backgroundColor: '#ffffff', width: 200 }}
                                secureTextEntry={true}
                                    onChangeText={(text) => {
                                        this.setState({
                                            pwd: text
                                        })
                                    }}
                                    value={this.state.pwd}></TextInput>
                            </View>

                            <View style={{ flexDirection: 'row', alignSelf: 'center', marginTop: 10, }}>
                                <Button title='登录' onPress={() => this.loginauth()}></Button>
                                <Text style={{ width: 30 }} />
                                <Button title='注册' onPress={() => this.register()}></Button>
                            </View>
                        </View>
                    </ScrollView>
                    <Tabbar navTo={navigate.bind(this)} initTab='me' />
                </View>
            );
        }
        else {
            return (
                <View style={styles.container}>
                    <ScrollView style={styles.container}>
                        <Text>Login...</Text>
                        <ActivityIndicator style={styles.actidc} size="large" color="#FF00FF" />
                    </ScrollView>
                    <Tabbar navTo={navigate.bind(this)} initTab='me' />
                </View>
            );
        }
    }
    register() {
        fetch(HOT_CXD_URL,
            {
                method: 'POST',
                headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    Username: this.state.uid,
                    Password: this.state.pwd,
                    Avatar: 'default',
                })
            })
            .then((response) => {
                return response.json()
            })
            .then((responseData) => {
                if (responseData.Id) {
                    Global.Userid = JSON.stringify(responseData.Id);
                    Global.Username = responseData.Username;
                    Global.Password = responseData.Password;
                    Global.Avatar = responseData.Avatar;
                    //Alert.alert('ccc',Global.Userid)
                    //this.props.navigation.navigate('me');
                    this.props.navigation.state.params.onGoBack();
                    this.props.navigation.goBack();
                }
            })
            .done();
        Alert.alert('OK!');
    }
    loginauth() {
        //guid = this.state.uid;
        //gpwd = this.state.pwd;
        /*
                this.setState({
                    loaded: true,
                })
        */
       // Alert.alert('ccc',HOT_CXD_URL+'?uid='+this.state.uid+'&pwd='+this.state.pwd)
        fetch(HOT_CXD_URL + '/getuserid?uid=' + this.state.uid + '&pwd=' + this.state.pwd)
            .then((response) => {
                return response.json()
            })
            .then((responseData) => {
         //       Alert.alert('ccc',JSON.stringify(responseData))
                if (responseData.Id) {
                    Global.Userid = JSON.stringify(responseData.Id);
                    Global.Username = responseData.Username;
                    Global.Password = responseData.Password;
                    Global.Avatar = responseData.Avatar;
                    this.props.navigation.state.params.onGoBack();
                    this.props.navigation.goBack();
                }
                else {
                    Alert.alert('Fail', 'Wrong UID or PWD!');
                    this.setState({
                        loaded: false,
                    })
                }
            })
           .catch((e) => {
                Alert.alert('Fail', e.message);
                this.setState({
                    loaded: false,
                })
                
            });

    }
}

