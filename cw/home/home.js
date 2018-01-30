import React, { Component } from 'react';
import { StackNavigator, } from 'react-navigation';
import {
    View,
    ActivityIndicator,
    StyleSheet,
    Text,
    ScrollView,
    Image,
    ListView,
    TouchableOpacity,
    Alert,
} from 'react-native';
import Tabbar from '../component/tabbar';
import styles from '../config/style';
import ScrollableTabView , { DefaultTabBar, } from 'react-native-scrollable-tab-view'
let Dimensions = require('Dimensions');
const hwidth = Dimensions.get('window').width;
const hheight = Dimensions.get('window').height;
import Cimages from '../config/images';
import Mconfig from '../config/mconfig';
let HOT_CXD_URL = `${Mconfig.CWUrl}`;
import Global from '../config/global';

export default class home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dataSourceF: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2
            }),
            dataSourceM: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2
            }),
            dataSourceW: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2
            }),
            dataSourceY: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2
            }),
            loaded: false,
        }
    }
    static navigationOptions = ({ navigation }) => ({
        title:'佣金详情',
    });
    componentWillMount() {
        this.fetchData();
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
                    <Tabbar navTo={navigate.bind(this)} initTab='favorite' />
                </View>
            );
        }
        else {
        return (
            <View style={styles.container}>
            <ScrollView style={styles.container}>
                <ScrollableTabView  
                    style={{ width: hwidth, height: hheight-85 }}
                    tabBarBackgroundColor="#FFFFFF"  
                    tabBarActiveTextColor="#FF0000"  
                    tabBarInactiveTextColor="#0000FF"  
                    tabBarUnderlineStyle={{backgroundColor:"#000000",height:2}}
                    renderTabBar={()=><DefaultTabBar backgroundColor='rgba(255, 255, 255, 0.7)' />}
                >

                    <View style={styles.container} tabLabel='日'>
                    <ListView  //关键在这里，绑定数据dataSource，渲染界面renderRow
                            dataSource={this.state.dataSourceF}
                            renderRow={this._renderRowF.bind(this)}
                        //style={styles.listView}
                        //contentContainerStyle={styles.listViewStyle}
                        //<Image source={Cimages.j9} style={{ width: hwidth, height: hheight-85,resizeMode:'contain' }} />
                        enableEmptySections = {true}
                        />
                    </View>
                    <View style={styles.container} tabLabel='周'>
                    <ListView  //关键在这里，绑定数据dataSource，渲染界面renderRow
                            dataSource={this.state.dataSourceW}
                            renderRow={this._renderRowW.bind(this)}
                        //style={styles.listView}
                        //contentContainerStyle={styles.listViewStyle}
                        //<Image source={Cimages.j10} style={{ width: hwidth, height: hheight-85,resizeMode:'contain' }} />
                        enableEmptySections = {true}
                        />
                    </View>
                    <View style={styles.container} tabLabel='月'>
                    <ListView  //关键在这里，绑定数据dataSource，渲染界面renderRow
                            dataSource={this.state.dataSourceM}
                            renderRow={this._renderRowM.bind(this)}
                        //style={styles.listView}
                        //contentContainerStyle={styles.listViewStyle}
                        //<Image source={Cimages.j10} style={{ width: hwidth, height: hheight-85,resizeMode:'contain' }} />
                        enableEmptySections = {true}
                        />
                    </View>
                    <View style={styles.container} tabLabel='年'>
                    <ListView  //关键在这里，绑定数据dataSource，渲染界面renderRow
                            dataSource={this.state.dataSourceY}
                            renderRow={this._renderRowY.bind(this)}
                        //style={styles.listView}
                        //contentContainerStyle={styles.listViewStyle}
                        //<Image source={Cimages.j9} style={{ width: hwidth, height: hheight-85,resizeMode:'contain' }} />
                        enableEmptySections = {true}
                        />
                    </View>
                </ScrollableTabView>
                </ScrollView>

                <Tabbar navTo={navigate.bind(this)} initTab='favorite'/>
            </View>
        );
    }
    }
    componentDidMount() {
        //组件加载完成，开始加载网络数据
        this.fetchData();

    }

    fetchData() {
        //Alert.alert('c',HOT_CXD_URL + Global.Userid)
        fetch(HOT_CXD_URL + Global.Userid)
            .then((response) => {
                return response.json()
            })
            .then((responseData) => {
                //Alert.alert('c',JSON.stringify(responseData))
                this.setState({
                    dataSourceF: this.state.dataSourceF.cloneWithRows(responseData.summary_day),
                    dataSourceM: this.state.dataSourceM.cloneWithRows(responseData.summary_month),
                    dataSourceW: this.state.dataSourceF.cloneWithRows(responseData.summary_week),
                    dataSourceY: this.state.dataSourceM.cloneWithRows(responseData.summary_year),                    loaded: true,
                })
            })
            .catch((e)=>{});//.done();
    }
    _renderRowF(item) {
        
        return (


                <View>
                     <View>
                        <Text style={{ width: hwidth, }}> 总价：{item.total_paid}，佣金：{item.total_rebated}，时间：{item.key.Year}/{item.key.Month}/{item.key.Day}</Text>
                    </View>
                </View>

        )
    }
    _renderRowM(item) {
        return (


                <View>

                    <View>
                    <Text style={{ width: hwidth, }}> 总价：{item.total_paid}，佣金：{item.total_rebated}，时间：{item.key.Year}/{item.key.Month}</Text>
                    </View>
                </View>

        )
    }
    _renderRowY(item) {
        
        return (


                <View>
                     <View>
                        <Text style={{ width: hwidth, }}> 总价：{item.total_paid}，佣金：{item.total_rebated}，时间：{item.key.Year}</Text>
                    </View>
                </View>

        )
    }
    _renderRowW(item) {
        return (


                <View>

                    <View>
                    <Text style={{ width: hwidth, }}> 总价：{item.total_paid}，佣金：{item.total_rebated}，时间：{item.key.Year}/{item.key.Value}</Text>
                    </View>
                </View>

        )
    }
}

