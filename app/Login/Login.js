import React, { PureComponent } from 'react';
import {
  Platform,
  Text,
  View,
  Image,
  TouchableHighlight,
  Alert,
  BackHandler,
  AsyncStorage
} from 'react-native';

import { NetworkInfo } from 'react-native-network-info';
import DeviceInfo from 'react-native-device-info';

//customize components
import NavigationHelper from '../../components/Common_NavigationHelper/Common_NavigationHelper.js'
import CommonTextInput from '../../components/Common_TextInput/Common_TextInput.js'
import AsyncHelper from '../../components/Common_AsyncHelper/Common_AsyncHelper.js'

const API_LOGIN = "http://www.ichild.com.sg/WebService/ICHILD.asmx/Login";
//const API_LOGIN = "http://www.ichild.com.sg/WebService/ICHILD.asmx/Login?LoginID=luke&Pwd=123456&IP=1.0.0.2&System=Android%208.0.0&Device=1234567890&From=mobile";

export default class Login extends PureComponent {
  constructor(props){
    super(props);
    this._onUserIDChanged = this._onUserIDChanged.bind(this);
    this._onPasswordChanged = this._onPasswordChanged.bind(this);
    this.state={
      loginID: '',
      password: ''
    }
    AsyncStorage.getItem('LoginID').then((keyValue) => {
      this.setState({
        loginID: keyValue
      })
    });
    //login required
    NetworkInfo.getIPAddress(ip => {
      this.ip = ip;
    });
    this.source = 'Mobile'
    this.systemVersion = DeviceInfo.getSystemName() + " " + DeviceInfo.getSystemVersion();
    this.deviceID = DeviceInfo.getUniqueID();

    //msg
    this.loginErrorMsg = 'Check The Account Number Or Password Is Empty'
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
    this.setState({
      loginID: value
    })
  }

  _onPasswordChanged(value){
    this.setState({
      password: value
    })
  }

  _login(){
    if(this.state.loginID.length == 0 || this.state.password == 0)
    {
      Alert.alert(this.loginErrorMsg);
    }
    else{
      fetch(API_LOGIN + '?LoginID='+this.state.loginID+'&Pwd='+this.state.password+
      '&IP='+this.ip+'&System='+this.systemVersion+'&Device='+this.deviceID+
      '&From='+this.source,
      {
          method: 'GET'
      }).
      then((response) => response.text()).
      then((response) => {
        if (response) {
          response=response.replace('<?xml version="1.0" encoding="utf-8"?>','')
          response=response.replace('<string xmlns="http://www.ichild.cc/">','')
          response=response.replace('</string>','')
          var responseJSON = JSON.parse(response)
          if(responseJSON.StatusCode == "0000"){
            var loginJSON = JSON.parse(responseJSON.Remark);
            ///do something here
            //MobileToken, FirstName, LastName, HeadSculpture
            this.refs.asyncHelper._setData("LoginID", this.state.loginID);
            this.refs.asyncHelper._setData("MobileToken", loginJSON.MobileToken);
            this.refs.asyncHelper._setData("FirstName", loginJSON.FirstName);
            this.refs.asyncHelper._setData("LastName", loginJSON.LastName);
            this.refs.asyncHelper._setData("Name", loginJSON.FirstName + " " + loginJSON.LastName);
            this.refs.asyncHelper._setData("UserID", loginJSON.UserID);
            this.refs.asyncHelper._setData("HeadSculpture", loginJSON.HeadSculpture);

            this.refs.navigationHelper._navigate('Feed',{})

          }
          else{
            Alert.alert(responseJSON.Remark)
          }
        }
      })
      .catch((error) => {
          console.log(error);
      });
    }
  }

  render() {

    return (
      <View style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'}
      }>
        <AsyncHelper ref={"asyncHelper"}/>
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
              value = {this.state.loginID}
              onChange = {this._onUserIDChanged}
            />

            <CommonTextInput
              icon = {require('../../assets/icons/password_icon.png')}
              type = {'password'}
              hint = {"Password"}
              value = {this.state.password}
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
