import React, { Component } from 'react';
import { StackNavigator, } from 'react-navigation';
import {
    View,
    ActivityIndicator,
    StyleSheet,
    Text,
    NativeModules,
    ScrollView
} from 'react-native';
import Tabbar from '../component/tabbar';
import styles from '../config/style';

export default class mirror extends Component {
    render() {
        const { navigate } = this.props.navigation

        return (
            <View style={styles.container}>
            <ScrollView style={styles.container}>
                <Text>mirror</Text>
                <ActivityIndicator style={styles.actidc} size="large" color="#FF00FF" />
                </ScrollView>
                <Tabbar navTo={navigate.bind(this)} initTab='mirror'/>
            </View>
        );
    }
    componentDidMount() {
        //组件加载完成，开始加载网络数据
        NativeModules.IntentModule.startActivityByClassname("com.magic.MirrorActivity","http://magic-2.apphb.com/taobao/images/q03.jpg")
        //NativeModules.IntentModule.startActivityByClassname
    }

}

