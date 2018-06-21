import React, { PureComponent } from 'react';
import {
  Platform,
  Text,
  View,
  Image,
  ImageBackground,
  TouchableHighlight,
  AsyncStorage,
  Alert
} from 'react-native';

import {CachedImage} from 'react-native-cached-image';

//customize components
import NavigationHelper from '../../components/Common_NavigationHelper/Common_NavigationHelper.js'
var profileImg = require('../../assets/images/profile-phone-bg.jpg');
import AsyncHelper from '../../components/Common_AsyncHelper/Common_AsyncHelper.js'

export default class Profile extends PureComponent {
  constructor(props){
    super(props);
    this.state={
      userImage: '',
      userName: ''
    }
    AsyncStorage.getItem('HeadSculpture').then((keyValue) => {
      this.setState({
        userImage: keyValue
      })
    });
    AsyncStorage.getItem('Name').then((keyValue) => {
      this.setState({
        userName: keyValue
      })
    });
  }

  componentDidMount(){
    this.refs.asyncHelper._getData("MobileToken", (value)=>{
      if(!value){
        // Alert.alert(
        //     "Error",
        //     "Authorization failed. Please login again.",
        //     [
        //       {text: 'Ok', onPress: () => {
        //         this.refs.navigationHelper._navigate('Login', {})
        //       }, style: 'default'},
        //     ],
        //     { cancelable: false }
        // )
        this.refs.navigationHelper._navigate('Login', {})
      }
    })
  }

  componentWillReceiveProps(nextProps){
    AsyncStorage.getItem('HeadSculpture').then((keyValue) => {
      this.setState({
        userImage: keyValue
      })
    });
    AsyncStorage.getItem('Name').then((keyValue) => {
      this.setState({
        userName: keyValue
      })
    });
  }

  _logout(){
    this.refs.asyncHelper._removeData("MobileToken");
    this.refs.asyncHelper._removeData("FirstName");
    this.refs.asyncHelper._removeData("LastName");
    this.refs.asyncHelper._removeData("Name");
    this.refs.asyncHelper._removeData("HeadSculpture");
    this.refs.navigationHelper._navigate('Login',{})
  }

  render() {
    //profile-phone-bg.jpg
    return (
      <View style={{flex: 1}
      }>
        <AsyncHelper ref={"asyncHelper"}/>
        <NavigationHelper
          ref={"navigationHelper"}
          navigation={this.props.navigation} />
        <View style={{
          flexDirection: 'column',
          flex: 1,
        }}>
          <ImageBackground style={{
              flex: 3,
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center'
            }}
            source={profileImg}>
            <Image
              style={{
                width: 90,
                height: 90,
                borderRadius: 100,
                borderWidth: 5,
                borderColor: '#7ec0dd'
              }}
              source={{uri: "http://www.ichild.com.sg" + this.state.userImage}}
            />
            <Text style={{
                fontSize: 20,
                color: 'white',
                marginTop: 10
              }}>
              {this.state.userName}
            </Text>
          </ImageBackground>
          <View style={{
            flexDirection: 'column',
            flex: 5,
            alignItems: 'center',
            justifyContent: 'flex-end',
            marginBottom: 40
            }}>
              <TouchableHighlight style={{
                  backgroundColor: 'red',
                  width: '85%',
                  height: 45,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 5,
                }}
                onPress={() => this._logout()}
                underlayColor='#fff'
              >
                <Text style={{
                  color: 'white',
                  fontSize: 18,
                }}>
                Sign Out</Text>
              </TouchableHighlight>

          </View>
        </View>
      </View>
    );
  }
}
