import React, { PureComponent } from 'react';
import {
  Platform,
  Text,
  View,
  Image,
  ImageBackground,
  TouchableHighlight
} from 'react-native';

//customize components
import NavigationHelper from '../../components/Common_NavigationHelper/Common_NavigationHelper.js'
var profileImg = require('../../assets/images/profile-phone-bg.jpg');

export default class Profile extends PureComponent {
  constructor(props){
    super(props);
  }

  _login(){
    //this.refs.navigationHelper._navigate('Feed',{})
  }

  render() {
    //profile-phone-bg.jpg
    return (
      <View style={{flex: 1}
      }>
        <NavigationHelper
          ref={"navigationHelper"}
          navigation={this.props.navigation} />
        <View style={{
          flexDirection: 'column',
          flex: 1,
        }}>
          <ImageBackground style={{
              flex: 3,
              justifyContent: 'center',
              alignItems: 'center'
            }}
            source={profileImg}
          >
            <Text>Lina</Text>
          </ImageBackground>
          <View style={{
            flexDirection: 'row',
            flex: 5,
            justifyContent: 'center',
            alignItems: 'center'}}>

          </View>
        </View>
      </View>
    );
  }
}
