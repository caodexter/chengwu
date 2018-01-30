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
        }
    }
    static navigationOptions = ({ navigation }) => ({
        title: '收入趋势',

    });
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
                //Alert.alert('JR', responseData.summary_day.length.toString());
                
                for (var i = 0; i < responseData.summary_day.length; i++) 
                {
                    timelst[i] = responseData.summary_day[i].key.Year.toString() + responseData.summary_day[i].key.Month.toString() + responseData.summary_day[i].key.Day.toString();
                    sumlst[i] = responseData.summary_day[i].total_rebated;

                    //timelst[i] = responseData.summary_day[i].key.Day.toString();
                    //sumlst[i] = responseData.summary_day[i].key.Day;
                    
                }
                
                this.state.option.xAxis.data = timelst;
                this.state.option.yAxis.data = sumlst;
                this.setState({
                    loaded: true,
                })
                //Alert.alert('JR', timelst[0]).toString();
            })
            .done();
    }
    
}

