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
    AsyncStorage
} from 'react-native';
import Tabbar from '../component/tabbar';
import styles from '../config/style';
import Cimages from '../config/images';
import Swiper from 'react-native-swiper';
import Mconfig from '../config/mconfig';
import Echarts from 'native-echarts'

let Dimensions = require('Dimensions');
const hwidth = Dimensions.get('window').width;
let HOT_CXD_URL = `${Mconfig.CWUrl}`;
let timelst = [];
let sumlst = [];
var keyName = 'jdata';
var keyValue = '';
var jsondata;

export default class model extends Component {
    constructor(props) {
        super(props)
        this.state = {

            loaded: false,
            option: {
                title: {
                    text: '趋势',

                },
                tooltip: {},
                legend: {
                    data: ['金额']
                },
                xAxis: {
                    data: timelst
                },
                yAxis: {},
                series: [{
                    name: '金额',
                    type: 'line',
                    data: sumlst
                }]
            },
            text: 'text',
            netstate: false,
            result:'',
        }
    }
    static navigationOptions = ({ navigation }) => ({
        title: '收入趋势',

    });
    _hiddenbtn() {
        if (this.state.netstate) {
            return (<View style={{ flex: 1, flexDirection: 'row' }}>
                <Text>数据连接失败，显示旧的数据。 </Text>
            </View>)
        }
    }
    render() {
        const { navigate } = this.props.navigation
        if (!this.state.loaded) {
            return (
                <View style={styles.container}>
                    <ScrollView style={styles.container}>
                        <Text>...</Text>
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
                    {this._hiddenbtn()}
                        <Echarts option={this.state.option}
                            height={hwidth} width={hwidth} />
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
        fetch(HOT_CXD_URL)
            .then((response) => {
                return response.json()
            })
            .then((responseData) => {
                for (var i = 0; i < responseData.summary_day.length; i++) {
                    timelst[i] = responseData.summary_day[i].key.Year.toString() + responseData.summary_day[i].key.Month.toString() + responseData.summary_day[i].key.Day.toString();
                    sumlst[i] = responseData.summary_day[i].total_rebated;
                }

                this.state.option.xAxis.data = timelst;
                this.state.option.yAxis.data = sumlst;
                this.setState({
                    netstate: false,
                    loaded: true,
                })
            })
            .catch((e) => {
                this2 = this;
                AsyncStorage.getItem(keyName, function (error, result) {
                    jsondata = JSON.parse(result);
                    for (var i = 0; i < jsondata.summary_day.length; i++) {
                        timelst[i] = jsondata.summary_day[i].key.Year.toString() + jsondata.summary_day[i].key.Month.toString() + jsondata.summary_day[i].key.Day.toString();
                        sumlst[i] = jsondata.summary_day[i].total_rebated;
                    }

                    this2.state.option.xAxis.data = timelst;
                    this2.state.option.yAxis.data = sumlst;
                    this2.setState({
                        netstate: true,
                        loaded: true,
                    })

                })

            });
    }

}

