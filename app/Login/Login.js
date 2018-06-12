import React, { PureComponent } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';

//customize components
import NavigationHelper from '../../components/Common_NavigationHelper/Common_NavigationHelper.js'



export default class Login extends PureComponent {
  componentDidMount(){
    this.refs.navigationHelper._navigate('Home', {
    })
  }

  render() {
    return (
      <View >
        <NavigationHelper
          ref={"navigationHelper"}
          navigation={this.props.navigation} />
        <Text >
          Login
        </Text>

      </View>
    );
  }
}
