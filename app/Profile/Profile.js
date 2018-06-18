import React, { PureComponent } from 'react';
import {
  Platform,
  Text,
  View,
  Image,
  TouchableHighlight
} from 'react-native';

//customize components
import NavigationHelper from '../../components/Common_NavigationHelper/Common_NavigationHelper.js'

export default class Profile extends PureComponent {
  constructor(props){
    super(props);
  }

  _login(){
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
      </View>
    );
  }
}
