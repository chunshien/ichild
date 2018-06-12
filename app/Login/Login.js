import React, { PureComponent } from 'react';
import {
  Platform,
  Text,
  View,
  Image,
  TextInput
} from 'react-native';

//customize components
import NavigationHelper from '../../components/Common_NavigationHelper/Common_NavigationHelper.js'
import CommonTextInput from '../../components/Common_TextInput/Common_TextInput.js'

export default class Login extends PureComponent {
  constructor(props){
    super(props);

  }

  render() {

    return (
      <View style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'}
      }>
        <NavigationHelper
          ref={"navigationHelper"}
          navigation={this.props.navigation} />
          <Image
            style={{
                width: 250,
                height: 80,
                marginBottom: 20
              }}
            source={require('../../assets/icons/logo.png')} />

          <View style={{
              flexDirection: 'column',
          }}>
            <CommonTextInput
              icon = {require('../../assets/icons/user_icon.png')}
              hint = {"User Id"}
            />

            <CommonTextInput
              icon = {require('../../assets/icons/password_icon.png')}
              hint = {"Password"}
            />
          </View>
      </View>
    );
  }
}
