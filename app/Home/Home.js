import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TextInput
} from 'react-native';

//customize components
import NavigationHelper from '../../components/Common_NavigationHelper/Common_NavigationHelper.js'
import StatusBarBackground from '../../components/Common_iOSStatusBar/Common_iOSStatusBar'
import HeaderSearch from '../../components/Common_HeaderSearch/Common_HeaderSearch'
import {CachedImage} from 'react-native-cached-image';

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


        <View style={{
            flex: 1,
            backgroundColor: '#e7f0f1',
            paddingVertical: 5
        }}>
          <ScrollView>
            <View style={{
                backgroundColor: 'white',
                marginVertical: 5,
                paddingVertical: 20,
                paddingHorizontal: 10
            }}>
              <View style={{flexDirection: 'row'}}>
                <CachedImage
                  style={{
                    width: 75,
                    height: 75,
                    borderRadius: 100,
                    borderWidth: 0.75,
                    borderColor: '#e7f0f1'
                  }}
                  source={{uri:'http://www.ichild.com.sg/UploadFile/fdbec8e1-ecf8-49c4-ab67-c7de67b94e3e/Photo/3f46a7c9-fed1-4fbd-b9fd-01266320151217201512172015121720151217211410.jpg'}}
                  />
                <View style={{
                    marginLeft: 10
                  }}>
                  <Text style={{fontSize: 22, fontWeight: '400'}}>
                    School Outdoor Play
                  </Text>
                  <Text style={{lineHeight: 20}}>
                    Luke Hong &middot;
                    The Childcare Centre &middot;
                    13:47 05 May 2018 &middot;
                    Owner
                  </Text>
                </View>

              </View>
              <View style={{paddingVertical: 10}}>
                <Text style={{lineHeight: 20}}>
                  This means that preschool organization can
                  build an integrated multi-tiered membership system
                  to communicate
                </Text>
              </View>
              
            </View>
          </ScrollView>
        </View>

      </View>
    );
  }
}
