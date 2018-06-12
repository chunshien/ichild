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



export default class Login extends PureComponent {
  constructor(props){
    super(props);
    this.fontSize = 20;
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
                height: 80
              }}
            source={require('../../assets/icons/logo.png')} />

          <View style={{
                flexDirection: 'column',
          }}>

          <View style={{flexDirection: 'row', width: '100%', height: 55}}>
              <Image
                style={{
                  width: 50,
                  height: 50
                }}
                source={require('../../assets/icons/user_icon.png')} />

              <TextInput
                underlineColorAndroid={"#0041cb"}
                placeholder={"User Id"}
                style={{
                  width: '60%',
                  height: 52,
                  textAlignVertical: 'center',
                  fontSize: this.fontSize,
                  paddingLeft: 15
                }}
              />
          </View>
          <View style={{flexDirection: 'row', width: '100%', height: 55}}>
              <Image
                style={{
                  width: 50,
                  height: 50
                }}
                source={require('../../assets/icons/password_icon.png')} />

              <TextInput
                underlineColorAndroid={"#0041cb"}
                placeholder={"Password"}
                style={{
                  width: '60%',
                  height: 52,
                  textAlignVertical: 'center',
                  fontSize: this.fontSize,
                  paddingLeft: 15
                }}
              />
          </View>

        </View>
      </View>
    );
  }
}
