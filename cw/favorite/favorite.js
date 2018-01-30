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
let HOT_CXD_URL = `${Mconfig.BaseUrlC}/api/users/`;
import Global from '../config/global';

export default class favorite extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dataSourceF: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2
            }),
            dataSourceM: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2
            }),
            loaded: false,
        }
    }
    static navigationOptions = ({ navigation }) => ({
        title:'收藏夹',
    });
    componentWillMount() {
        if (Global.Userid == null || Global.Userid == '') {
            this.props.navigation.navigate('login', {
                onGoBack: () => this.refresh(),
            });
        }
    }
    refresh() {
        this.fetchData();
        this.setState({
            // avatartsource: { uri: 'http://file.dih-tech.cn:8080' + '/files/' + Global.userid + '/' + Global.avatar },
            load: true,
        });
    }
    render() {
       
        const { navigate } = this.props.navigation
        if (!this.state.loaded) {
            return (
                <View style={styles.container}>
                    <ScrollView style={styles.container}>
                        <Text>favorite</Text>
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

                    <View style={styles.container} tabLabel='Favorites'>
                    <ListView  //关键在这里，绑定数据dataSource，渲染界面renderRow
                            dataSource={this.state.dataSourceF}
                            renderRow={this._renderRowF.bind(this)}
                        //style={styles.listView}
                        //contentContainerStyle={styles.listViewStyle}
                        //<Image source={Cimages.j9} style={{ width: hwidth, height: hheight-85,resizeMode:'contain' }} />
                        enableEmptySections = {true}
                        />
                    </View>
                    <View style={styles.container} tabLabel='Models'>
                    <ListView  //关键在这里，绑定数据dataSource，渲染界面renderRow
                            dataSource={this.state.dataSourceM}
                            renderRow={this._renderRowM.bind(this)}
                        //style={styles.listView}
                        //contentContainerStyle={styles.listViewStyle}
                        //<Image source={Cimages.j10} style={{ width: hwidth, height: hheight-85,resizeMode:'contain' }} />
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
                this.setState({
                    dataSourceF: this.state.dataSourceF.cloneWithRows(responseData.UGoods),
                    dataSourceM: this.state.dataSourceM.cloneWithRows(responseData.UModels),
                    loaded: true,
                })
            })
            .catch((e)=>{});//.done();
    }
    _renderRowF(item) {
        
        return (

            <TouchableOpacity
                onPress={() => this.props.navigation.navigate('good', { itemid: item.Id.toString() })}
                activeOpacity={0.8}
            >
                <View>
                    <Image
                        style={{ width: hwidth,height:hwidth*2/3, resizeMode:'contain',}}
                        source={{ uri: item.Urllink }}
                        key={item.Itemname}
                    //style={styles.listImgStyle}
                    />
                    <View>
                        <Text style={{ width: hwidth, }}> {item.Itemname}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
    _renderRowM(item) {
        //Alert.alert('JR',  JSON.stringify(item));
        return (

            <TouchableOpacity
                onPress={() => this.props.navigation.navigate('detail', { itemid: item.Id.toString() })}
                activeOpacity={0.8}
            >
                <View>
                    <Image
                        style={{ width: hwidth,height:hwidth*2/3, resizeMode:'contain',}}
                        source={{ uri: item.Urllink }}
                        key={item.Itemname}
                    //style={styles.listImgStyle}
                    />
                    <View>
                        <Text style={{ width: hwidth, }}> {item.Itemname}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
}

