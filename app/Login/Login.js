import React, { PureComponent } from 'react';
import {
  Platform,
  Text,
  View,
  Image,
  TouchableHighlight,
  Alert,
  BackHandler
} from 'react-native';

import { NetworkInfo } from 'react-native-network-info';
import DeviceInfo from 'react-native-device-info';

//customize components
import NavigationHelper from '../../components/Common_NavigationHelper/Common_NavigationHelper.js'
import CommonTextInput from '../../components/Common_TextInput/Common_TextInput.js'
const API_LOGIN = "http://www.ichild.com.sg/WebService/ICHILD.asmx/Login";
//?LoginID=luke&Pwd=123456&IP=1.0.0.2&System=Android%208.0.0&Device=1234567890&From=mobile
export default class Login extends PureComponent {
  constructor(props){
    super(props);
    this._onUserIDChanged = this._onUserIDChanged.bind(this);
    this._onPasswordChanged = this._onPasswordChanged.bind(this);
    this.userID = 'luke';
    this.password = '123456';
    NetworkInfo.getIPAddress(ip => {
      this.ip = ip;
    });
    this.source = 'Mobile'
    this.systemVersion = DeviceInfo.getSystemName() + " " + DeviceInfo.getSystemVersion();
    this.deviceID = DeviceInfo.getUniqueID();
  }

  componentWillMount(){
    BackHandler.addEventListener('hardwareBackPress', this._handleBackButton);
  }

  componentWillUnmount(){
    BackHandler.removeEventListener('hardwareBackPress', this._handleBackButton);
  }

  _handleBackButton(){
    BackHandler.exitApp();
  }

  _onUserIDChanged(value){
    this.userID = value;
  }

  _onPasswordChanged(value){
    this.password = value;
  }

  _login(){
    Alert.alert(this.userID + "-" +  this.password
    + "-" + this.ip + "-" + this.systemVersion + "-" + this.deviceID);
    //this.refs.navigationHelper._navigate('Feed',{})
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
              type = {'text'}
              hint = {"User Id"}
              value = {this.userID}
              onChange = {this._onUserIDChanged}
            />

            <CommonTextInput
              icon = {require('../../assets/icons/password_icon.png')}
              type = {'password'}
              hint = {"Password"}
              value = {this.password}
              onChange = {this._onPasswordChanged}
            />

            <TouchableHighlight
              style={{
                backgroundColor: '#1f6ad6',
                alignItems: 'center',
                padding: 10,
                borderRadius: 20,
                marginTop: 30
              }}
              onPress={() => this._login()}
              underlayColor='#fff'>
                <Text style={{
                  color: 'white', fontSize: 20
                }}>
                  Login
                </Text>
            </TouchableHighlight>
          </View>
      </View>
    );
  }
}
