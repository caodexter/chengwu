import React, { Component } from 'react'
import { ScrollView, Text, Image, View,TouchableOpacity } from 'react-native'
//import { Images } from '../config/images';

import Video from 'react-native-video';
import { NavigationActions } from 'react-navigation'
import  Cimages  from '../config/images';

// Styles
import styles from './LaunchScreenStyles'
import codePush from "react-native-code-push";
const codePushOptions = { checkFrequency: codePush.CheckFrequency.MANUAL };


const resetAction = NavigationActions.reset({
  index: 0,
  actions: [
    NavigationActions.navigate({ routeName: 'home' })
  ]
})

export default class welcome extends Component {
  static navigationOptions = {
    header: null
  }

  constructor(props) {
    super(props);
    this.state = {
      paused: false,
    }
  }

  _play() {
    this.setState({
      paused: !this.state.paused
    })
    this.player.seek(1);
  }

  _onLoad() {
    //console.tron.log('_onLoad')
    //console.tron.log(this.state)
  }
  _loadStart() {
    //console.tron.log('_loadStart')
    //console.tron.log(this.state)
  }
  _onEnd() {
    //console.tron.log('_onEnd')
    //console.tron.log(this.state)
    this.props.navigation.dispatch(resetAction)
  }
  _videoError() {
    //console.tron.log('_videoError')
    //console.tron.log(this.state)
  }
  componentDidMount(){
    codePush.sync({
      updateDialog: true,
      installMode: codePush.InstallMode.IMMEDIATE,
      mandatoryInstallMode:codePush.InstallMode.IMMEDIATE,
      //deploymentKey为刚才生成的,打包哪个平台的App就使用哪个Key,这里用IOS的打包测试
      deploymentKey: '_qd_oFm3OLs_H6eN_NXuPLtX5Tk1340f49b7-d234-43de-9a00-42630ef4d5c3',
      });
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        <Video
          //source={Images.LaunchScreen}
          source={Cimages.LaunchScreen}
          style={styles.backgroundVideo}
          resizeMode='cover'
          paused={this.state.paused}

          onLoad={this._onLoad.bind(this)}              // 当视频加载完毕时的回调函数
          onLoadStart={this._loadStart.bind(this)}        // 当视频开始加载时的回调函数
          //onProgress={this.onProgress.bind(this)}   //  进度控制，每250ms调用一次，以获取视频播放的进度
          onEnd={this._onEnd.bind(this)}            // 当视频播放完毕后的回调函数
          onError={this._videoError.bind(this)}    // 当视频不能加载，或出错后的回调函数

          ref={(ref) => {
            this.player = ref
          }}
        />
        {/* <Button  title={this.state.paused === false ? '暂停' : '播放'} onPress={this._play.bind(this)}/> */}
        
        <View style={styles.logoContainer}>
          <TouchableOpacity onPress={() => this.props.navigation.dispatch(resetAction)}>
            <Image source={Cimages.logo} style={styles.logo} />
          </TouchableOpacity>
        </View>
      </View>)
  }
}
