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
import ScrollableTabView , { DefaultTabBar, } from 'react-native-scrollable-tab-view'

let Dimensions = require('Dimensions');
const hwidth = Dimensions.get('window').width;
const hheight = Dimensions.get('window').height;
let HOT_CXD_URL = `${Mconfig.CWUrl}`;
let timelst = [];
let sumlst = [];
let timelstM = [];
let sumlstM = [];
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
            optionM: {
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
            result: '',
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
                        <ScrollableTabView
                            style={{ width: hwidth, height: hheight - 85 }}
                            tabBarBackgroundColor="#FFFFFF"
                            tabBarActiveTextColor="#FF0000"
                            tabBarInactiveTextColor="#0000FF"
                            tabBarUnderlineStyle={{ backgroundColor: "#000000", height: 2 }}
                            renderTabBar={() => <DefaultTabBar backgroundColor='rgba(255, 255, 255, 0.7)' />}
                        >

                            <View style={styles.container} tabLabel='月'>
                                <Echarts option={this.state.optionM}
                                    height={hwidth} width={hwidth} />
                            </View>
                            <View style={styles.container} tabLabel='年'>
                                <Echarts option={this.state.option}
                                    height={hwidth} width={hwidth} />
                            </View>
                        </ScrollableTabView>
                    </ScrollView>
                    <Tabbar navTo={navigate.bind(this)} initTab='model' />
                </View>

            );
        }
    }
    componentDidMount() {
        //组件加载完成，开始加载网络数据
        this.fetchData();
        //this.fulldaychart();
    }

    fetchData() {
        fetch(HOT_CXD_URL)
            .then((response) => {
                return response.json()
            })
            .then((responseData) => {

                this.fullyearchart(JSON.stringify(responseData));
                this.fullmonthchart(responseData);
                /*
                                for (var i = 0; i < responseData.summary_day.length; i++) {
                                    timelst[i] = responseData.summary_day[i].key.Year.toString() + responseData.summary_day[i].key.Month.toString() + responseData.summary_day[i].key.Day.toString();
                                    sumlst[i] = responseData.summary_day[i].total_rebated;
                                }
                
                                this.state.option.xAxis.data = timelst;
                                this.state.option.yAxis.data = sumlst;
                                */

                this.setState({
                    netstate: false,
                    loaded: true,
                })

            })//.done();

            .catch((e) => {
                this2 = this;
                /*
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

                })*/
                this2.setState({
                    netstate: true,
                    loaded: true,
                })
            });
    }
    fullmonthchart(jd) {
        var TempDate = new Date();
        var tyear = TempDate.getFullYear();
        var tmonth = TempDate.getMonth();
        var tyear1 = TempDate.getFullYear();
        var tmonth1 = TempDate.getMonth();

        //Alert.alert('c',tmonth.toString());

        if (tmonth > 6) {
            for (var j = 0; j < 6; j++) {
                tmonth = tmonth - 5 + j;
                timelstM[j] = tyear.toString() + '/' + tmonth.toString();
                for (var k = 0; k < jd.summary_month.length; k++) {
                    if ((tyear == jd.summary_month[k].Year) && (tmonth == jd.summary_month[k].Month)) {
                        sumlstM[j] = jd.summary_month[k].total_rebated;
                    }
                }
            }
        }
        else {
            for (var j = 0; j <  6 - TempDate.getMonth() ; j++) 
            {
                tmonth =  6 + TempDate.getMonth() + j;
                tyear = TempDate.getFullYear() -1;

                //Alert.alert('c',tmonth.toString());

                timelstM[j] = tyear.toString() + '/' + tmonth.toString();

                for (var k = 0; k < jd.summary_month.length; k++) {
                    if ((tyear == jd.summary_month[k].Year) && (tmonth == jd.summary_month[k].Month)) {
                        sumlstM[j] = jd.summary_month[k].total_rebated;
                    }
                }
            }
            
            for (var j = 0; j < TempDate.getMonth() ; j++) 
            {
                tmonth1 = j+1;
                 timelstM[j+6 - tmonth1] = tyear1.toString() + '/' + tmonth1.toString();
                for (var k = 0; k < jd.summary_month.length; k++) {
                    if ((tyear1 == jd.summary_month[k].Year) && (tmonth == jd.summary_month[k].Month)) {
                        sumlstM[j+6 - tmonth1] = jd.summary_month[k].total_rebated;
                    }
                }
            }
            
        }
        this.state.optionM.xAxis.data = timelstM;
        this.state.optionM.yAxis.data = sumlstM;
    }
    fullyearchart(sjd) {
        var TempDate = new Date();
        var tyear;
        var jd;
        var kjd;
        jd = JSON.parse(sjd);
        //Alert.alert('c', jd.summary_year[i].key.Year.toString());

        for (var j = 0; j < 6; j++) {
            tyear = TempDate.getFullYear() - 5 + j;
            timelst[j] = tyear.toString();
            for (var k = 0; k < jd.summary_year.length; k++) {
                //Alert.alert(tyear.toString(), jd.summary_year[k].key.Year.toString());
                if (jd.summary_year[k].key.Year.toString() == tyear.toString()) {
                    sumlst[j] = jd.summary_year[k].total_rebated;
                }
            }


        }

        this.state.option.xAxis.data = timelst;
        this.state.option.yAxis.data = sumlst;

    }
}

