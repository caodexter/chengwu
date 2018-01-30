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
let imglst;

export default class model extends Component {
    constructor(props) {
        super(props)
        this.state = {

            loaded: false,
            option: {
                title: {
                  text: '年度趋势',
        
                },
                tooltip: {},
                legend: {
                  data: ['销量']
                },
                xAxis: {
                  data: ["9:00", "12:00", "15:00", "18:00", "21:00", "24:00"]
                },
                yAxis: {},
                series: [{
                  name: '活跃人数',
                  type: 'line',
                  data: [5, 20, 36, 10, 10, 20]
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
                        <Text>model</Text>
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
                this.setState({
                    //dataSource: this.state.dataSource.cloneWithRows(responseData.PModels),
                    loaded: true,
                })
            })
            .done();
    }
    
}

