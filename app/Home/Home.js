import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';

//customize components
import NavigationHelper from '../../components/Common_NavigationHelper/Common_NavigationHelper.js'

export default class Home extends Component<Props> {
  componentDidMount(){
    this.refs.navigationHelper._navigate('Login', {
    })
  }

  render() {
    return (
      <View>
      <NavigationHelper
        ref={"navigationHelper"}
        navigation={this.props.navigation} />
        <Text>
          Home
        </Text>

      </View>
    );
  }
}
