import React, { PureComponent } from 'react';
import {
  Platform,
  Text,
  View,
  Image,
  ImageBackground,
  TouchableHighlight,
  AsyncStorage
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
      userImage: ''
    }
    AsyncStorage.getItem('HeadSculpture').then((keyValue) => {
      this.setState({
        userImage: keyValue
      })
    });
  }

  componentDidMount(){

  }

  _logout(){
    //this.refs.navigationHelper._navigate('Feed',{})
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
              }}
            >
            Lina Ng
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
