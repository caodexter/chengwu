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
import Mconfig from '../config/mconfig';
import Global from '../config/global';
let HOT_CXD_URL = `${Mconfig.BaseUrlC}/api/users`;
let Dimensions = require('Dimensions');
const hwidth = Dimensions.get('window').width;
const hheight = Dimensions.get('window').height;

export default class me extends Component {
    constructor(props) {
        super(props)
        this.state = {
            uid: '',
            pwd: '',
            atr: '',
            loaded: false,
        }
    }
    componentWillMount() {
        if (Global.Userid == null || Global.Userid == '') {
            this.props.navigation.navigate('login', {
                onGoBack: () => this.refresh(),
            });
        }
    }
    refresh() {
        //Alert.alert('cccccs')
        this.setState({
            uid: Global.Username,
            pwd: Global.Password,
            atr: Global.Avatar,
            loaded: true,
        });
    }
    static navigationOptions = ({ navigation }) => ({
        title: '个人设置',
    });
    update() {
        fetch(HOT_CXD_URL + '/' + Global.Userid,
            {
                method: 'PUT',
                headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    Id: Global.Userid,
                    Username: this.state.uid,
                    Password: this.state.pwd,
                    Avatar: this.state.atr,
                })
            })
        .then((response) => {
            //return response.json()
        })
        .then((responseData) => {

        })
        .done();
        Alert.alert('OK!');
    }

    render() {
        const { navigate } = this.props.navigation
        if (!this.state.loaded) {
            return (
                <View style={styles.container}>
                    <ScrollView style={styles.container}>
                        <Text>me</Text>
                        <ActivityIndicator style={styles.actidc} size="large" color="#FF00FF" />
                    </ScrollView>
                    <Tabbar navTo={navigate.bind(this)} initTab='me' />
                </View>
            );
        }
        else {
            return (
                <View style={styles.container}>
                    <ScrollView style={styles.container}>
                        <View style={{ height: hheight / 2, alignSelf: 'center', marginTop: 10, }}>
                            <View style={{ flexDirection: 'row', marginTop: 10, }}>
                                <Text style={{  width: 80 }} >UserName:</Text>
                                <TextInput style={{ backgroundColor: '#ffffff', width: 200 }}
                                    onChangeText={(text) => {
                                        this.setState({
                                            uid: text
                                        })
                                    }}
                                    value={this.state.uid}></TextInput>
                            </View>
                            <View style={{ flexDirection: 'row', marginTop: 10, }}>
                                <Text style={{  width: 80 }} >Password:</Text>
                                <TextInput style={{ backgroundColor: '#ffffff', width: 200 }}
                                    secureTextEntry={true}
                                    onChangeText={(text) => {
                                        this.setState({
                                            pwd: text
                                        })
                                    }}
                                    value={this.state.pwd}></TextInput>
                            </View>
                            <View style={{ flexDirection: 'row', marginTop: 10, }}>
                                <Text style={{  width: 80 }} >Avatar:</Text>
                                <TextInput    style={{ backgroundColor: '#ffffff', width: 200 }}
                                    onChangeText={(text) => {
                                        this.setState({
                                            atr: text
                                        })
                                    }}
                                    value={this.state.atr}></TextInput>
                            </View>
                            <View style={{ flexDirection: 'row', alignSelf: 'center', marginTop: 10, }}>
                                <Button title='确定' onPress={() => this.update()}></Button>
                                <Text style={{ width: 30 }} />
                                <Button title='取消' onPress={() => Alert.alert('ccc')}></Button>
                            </View>
                        </View>
                    </ScrollView>
                    <Tabbar navTo={navigate.bind(this)} initTab='me' />
                </View>
            );
        }
    }
}

