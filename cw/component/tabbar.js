import React, { Component } from 'react'
import { View, Text ,StyleSheet} from 'react-native'
import Tabs from 'react-native-tabs'
//import Icon from 'react-native-vector-icons/Ionicons'
import styles from '../config/style';

export default class tabbar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      page: this.props.initTab || 'welcome'
    }
  }

  onSelect(el) {
    if (el.props.name === this.state.page) {
      return false
    } else {
      this.setState({ page: el.props.name })
      //console.tron.log(el.props.name)
      this.props.navTo(el.props.name)
    }
  }

  render() {
    return (
      <Tabs selected={this.state.page} style={{ backgroundColor: 'white' }} selectedStyle={{ color: '#4F8EF7' }} onSelect={this.onSelect.bind(this)}>
        <Text name='home' style={styles.textAlignCenter} selectedIconStyle={styles.selectedTabStyle}>
          列表
        </Text>
        <Text name='model' style={styles.textAlignCenter} selectedIconStyle={styles.selectedTabStyle}>
          图形
        </Text>
        <Text name='mirror' style={styles.textAlignCenter} selectedIconStyle={styles.selectedTabStyle}>
          分析
        </Text>
        <Text name='favorite' style={styles.textAlignCenter} selectedIconStyle={styles.selectedTabStyle}>
          收藏
        </Text>
        <Text name='me' style={styles.textAlignCenter} selectedIconStyle={styles.selectedTabStyle}>
          我的
        </Text>
      </Tabs>
    )
  }
}

