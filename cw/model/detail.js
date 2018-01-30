import React, { Component } from 'react';
import { StackNavigator, } from 'react-navigation';
import {
    View,
    ActivityIndicator,
    StyleSheet,
    Text,
    ScrollView,
    Image,
    TextInput,
    Alert,
    ListView,
    TouchableOpacity,
    Button,
    Linking,
} from 'react-native';
import Tabbar from '../component/tabbar';
import styles from '../config/style';
import Cimages from '../config/images';
import Swiper from 'react-native-swiper';
import Mconfig from '../config/mconfig';

let Dimensions = require('Dimensions');
const hwidth = Dimensions.get('window').width;
let HOT_CXD_URL = `${Mconfig.BaseUrlC}/api/items/`;
//'http://magic-2.apphb.com/taobao/list_model.aspx';
let imgjson;
let itmid;
export default class detail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
        };


    }

    static navigationOptions = ({ navigation }) => ({
        title: '模特详细信息',

    });

    render() {
        const { navigate } = this.props.navigation;
        const { params } = this.props.navigation.state;
        itmid = params.itemid;

        if (!this.state.loaded) {
            return (
                <View style={styles.container}>
                    <ScrollView style={styles.container}>
                        <Text>modeldetail</Text>
                        <ActivityIndicator style={styles.actidc} size="large" color="#FF00FF" />
                    </ScrollView>
                    <Tabbar navTo={navigate.bind(this)} initTab='model' />
                </View>
            );
        }
        else {
            return (
                <View style={styles.container}>
                    <ScrollView style={styles.container}>
                        <Image source={{ uri: imgjson.Urllink }} style={{ width: hwidth, height: hwidth, resizeMode: 'contain' }} />
                        <Text>{imgjson.Itemname}</Text>
                        <View style={{ flexDirection: 'row', alignSelf: 'flex-end' }}>
                            <Button title='收藏' onPress={() => Alert.alert('sc')}></Button>
                            <Text style={{ width: 30 }} />
                            <Button title='下载' onPress={() => Linking.openURL(imgjson.Urllink)}></Button>
                        </View>
                    </ScrollView>
                    <Tabbar navTo={navigate.bind(this)} initTab='model' />
                </View>

            );
        }
    }
    componentDidMount() {
        //组件加载完成，开始加载网络数据
        this.fetchData();

    }

    fetchData() {
        fetch(HOT_CXD_URL + itmid)
            .then((response) => {
                return response.json()
            })
            .then((responseData) => {
                imgjson = responseData;
                this.setState({
                    loaded: true,
                })
            })
            .done();
    }
}

