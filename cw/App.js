
import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';

import * as ReactNavigation from 'react-navigation';
import Navi from './config/navigator'

export default class App extends Component<{}> {
  render() {
    return (
      <Navi  />
    );
  }
}


