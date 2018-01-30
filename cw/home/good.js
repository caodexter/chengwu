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
    Button,
    Linking,
    TouchableOpacity,
} from 'react-native';
import Tabbar from '../component/tabbar';
import styles from '../config/style';
import Cimages from '../config/images';
import Swiper from 'react-native-swiper';
import Mconfig from '../config/mconfig';

let Dimensions = require('Dimensions');
const hwidth = Dimensions.get('window').width;
const hheight = Dimensions.get('window').height;

let HOT_CXD_URL = `${Mconfig.BaseUrlC}/api/items/`;
//'http://magic-2.apphb.com/taobao/list_model.aspx';
let imglst;
let itmid;

export default class good extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2
            }),
            loaded: false,
        }
    }
    static navigationOptions = ({ navigation }) => ({
        title: '宝贝详细信息',


    });
    render() {
        const { navigate } = this.props.navigation;


        const { params } = this.props.navigation.state;
        itmid = params.itemid;

        //Alert.alert('JR',itmid);

        if (!this.state.loaded) {
            return (
                <View style={styles.container}>
                    <ScrollView style={styles.container}>
                        <Text>good</Text>
                        <ActivityIndicator style={styles.actidc} size="large" color="#FF00FF" />
                    </ScrollView>
                    <Tabbar navTo={navigate.bind(this)} initTab='home' />
                </View>
            );
        }
        else {
            return (
                <View style={styles.container}>
                    <ScrollView style={styles.container}>
                        <Swiper 
                            width={ hwidth }
                            height={hwidth * 2 / 3 }
                            loop={true}
                            // showsButtons={true}
                            index={0}
                            autoplay={true}
                            horizontal={true}
                            style={{backgroundColor:'#303030'}}
                            //showsPagination = {false}
                        >
                            {this.renderImg()}
                        </Swiper>
                        <View style={{ flexDirection: 'row', alignSelf: 'flex-end' }}>
                            <Button title='收藏' onPress={() => Alert.alert('sc')}></Button>
                            <Text style={{ width: 30 }} />
                            <Button title='购买' onPress={() => Linking.openURL(imgjson.Urllink)}></Button>
                        </View>

                        <View style={{ height: 10, backgroundColor: '#C0C0C0' }} />
                        <ListView  //关键在这里，绑定数据dataSource，渲染界面renderRow
                            dataSource={this.state.dataSource}
                            renderRow={this._renderRow.bind(this)}
                            style={{flex:1, }}
                            //contentContainerStyle={styles.listViewStyle}
                            enableEmptySections = {true}
                        />
                    </ScrollView>
                    <Tabbar navTo={navigate.bind(this)} initTab='home' />
                </View>

            );
        }
    }
    componentDidMount() {
        //组件加载完成，开始加载网络数据
        this.fetchData();

    }
    renderImg() {
        var imageViews = [];
        imageViews.push(
            <Image
                key={0}
                style={{ flex: 1 }}
                source={{ uri: imglst.Urllink }} style={{width: hwidth, height:hwidth * 2 / 3 ,resizeMode:'contain'}}
            />
        );
        if (imglst.IPictures) {
            for (var i = 1; i < imglst.IPictures.length; i++) {
                imageViews.push(
                    <Image
                        key={i}
                        style={{ flex: 1 }}
                        source={{ uri: imglst.IPictures[i].Urllink }} style={styles.img}
                    />
                );
            }
        }
        //imageViews.push(<Text>lalala</Text>);
        return imageViews;
    }
    fetchData() {
        //Alert.alert('c',HOT_CXD_URL + itmid)
        fetch(HOT_CXD_URL + itmid)
            .then((response) => {
                return response.json()
            })
            .then((responseData) => {
                //Alert.alert('JR', JSON.stringify(responseData));
                //console.log("responseData.data==" + JSON.stringify(responseData))
                imglst = responseData;

                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(responseData.IComments),
                    loaded: true,
                })
            })
            .done();
    }
    componentDidMount() {
        //组件加载完成，开始加载网络数据
        this.fetchData();

    }


    _renderRow(item) {
        return (
            <TouchableOpacity
                onPress={() => this._delfavorite(item)}
                activeOpacity={0.8}
            >
                <View style={{ alignItems: 'center' }}>
                        <Text style={{ width: hwidth,}}> {item.Detailname}</Text>
                </View>
            </TouchableOpacity>
        )
    }
}

