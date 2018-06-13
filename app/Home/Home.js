import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput
} from 'react-native';

//customize components
import NavigationHelper from '../../components/Common_NavigationHelper/Common_NavigationHelper.js'
import StatusBarBackground from '../../components/Common_iOSStatusBar/Common_iOSStatusBar'
import HeaderSearch from '../../components/Common_HeaderSearch/Common_HeaderSearch'

export default class Home extends Component<Props> {
  componentDidMount(){
    //this.refs.navigationHelper._navigate('Login', {})
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <StatusBarBackground lightContent={true} style={{ backgroundColor: '#3a8ebc' }} />
        <NavigationHelper
          ref={"navigationHelper"}
          navigation={this.props.navigation} />
        <View style={{
          flexDirection: 'row',
          backgroundColor: '#3a8ebc',
          paddingHorizontal: 15,
          paddingTop: 10,
          paddingBottom: 5,
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <HeaderSearch
            hint = {'Search'}
            height = {30}
            borderRadius = {5}
            icon = {require('../../assets/icons/search_icon.png')}
            iconSize = {35}
            iconBackgroundColor = {"#8fcbe5"}
          />

          <Image
              style={{
                width: 35,
                height: 35,
                alignSelf: 'flex-end',
              }}
              source={require('../../assets/icons/message_icon.png')} />
        </View>

        
      </View>
    );
  }
}
