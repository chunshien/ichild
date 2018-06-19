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
import FeedItem from '../../components/Feed_FeedItem/Feed_FeedItem'

export default class Feed extends Component<Props> {
  constructor(props){
    super(props);
    this.feedTitleFontSize = 22;
    this.feedFontSize = 16;
  }

  extention(filename){
    return (/[.]/.exec(filename)) ? /[^.]+$/.exec(filename) : undefined;
  }

  componentDidMount(){
    this.refs.navigationHelper._navigate('Login', {})
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

            <FeedItem
              feedTitleFontSize = {this.feedTitleFontSize}
              feedFontSize = {this.feedFontSize}
              feedTitle = {'School Outdoor Play'}
              feedText = {'This means that preschool organization can build an integrated multi-tiered membership system to communicate'}
              userName = {'Luke Hong'}
              schoolName = {'The Childcare Centre'}
              postedDate = {'13:47 05 May 2018'}
              userImage = {'/UploadFile/fdbec8e1-ecf8-49c4-ab67-c7de67b94e3e/Photo/3f46a7c9-fed1-4fbd-b9fd-01266320151217201512172015121720151217211410.jpg'}
              feedImages = {[
                {
                  type: 'youtube',
                  path: 'http://www.youtube.com/embed/OZRvmzcKD2Y?autoplay=0&rel=0&hd=1'
                }
              ]}
              files={[
                {
                  'filename': '570245_113738.pdf',
                  'url': '/UploadFile/fdbec8e1-ecf8-49c4-ab67-c7de67b94e3e/AccountV3/o_1c2it8ne81kfbeqlteqncteqka.pdf'
                }
              ]}
            />

            <FeedItem
              feedTitleFontSize = {this.feedTitleFontSize}
              feedFontSize = {this.feedFontSize}
              feedTitle = {'School Outdoor Play'}
              //feedText = {'This means that preschool organization can build an integrated multi-tiered membership system to communicate'}
              userName = {'Luke Hong'}
              schoolName = {'The Childcare Centre'}
              postedDate = {'13:47 05 May 2018'}
              userImage = {'/UploadFile/fdbec8e1-ecf8-49c4-ab67-c7de67b94e3e/Photo/3f46a7c9-fed1-4fbd-b9fd-01266320151217201512172015121720151217211410.jpg'}
              feedImages = {[
                {
                  type: 'image',
                  path: '/UploadFile/fdbec8e1-ecf8-49c4-ab67-c7de67b94e3e/AccountV3/s_1cf77n0e4te5njr1tl215ff8n4a.jpg'
                },
                {
                  type: 'image',
                  path: '/UploadFile/fdbec8e1-ecf8-49c4-ab67-c7de67b94e3e/AccountV3/s_1cf77n0e4te5njr1tl215ff8n4a.jpg'
                },
                {
                  type: 'youtube',
                  path: 'http://www.youtube.com/embed/OZRvmzcKD2Y?autoplay=0&rel=0&hd=1'
                },
                {
                  type: 'image',
                  path: '/UploadFile/fdbec8e1-ecf8-49c4-ab67-c7de67b94e3e/AccountV3/s_1cf77n0e4te5njr1tl215ff8n4a.jpg',
                },
                {
                  type: 'image',
                  path: '/UploadFile/fdbec8e1-ecf8-49c4-ab67-c7de67b94e3e/AccountV3/s_1cf77n0e4te5njr1tl215ff8n4a.jpg',
                },
                {
                  type: 'image',
                  path: '/UploadFile/fdbec8e1-ecf8-49c4-ab67-c7de67b94e3e/AccountV3/s_1cf77n0e4te5njr1tl215ff8n4a.jpg'
                }
              ]}
              files={[
                {
                  'filename': '570245_113738.pdf',
                  'url': '/UploadFile/fdbec8e1-ecf8-49c4-ab67-c7de67b94e3e/AccountV3/o_1c2it8ne81kfbeqlteqncteqka.pdf'
                }
              ]}
            />

            <FeedItem
              feedTitleFontSize = {this.feedTitleFontSize}
              feedFontSize = {this.feedFontSize}
              feedTitle = {'School Outdoor Play'}
              feedText = {'This means that preschool organization can build an integrated multi-tiered membership system to communicate'}
              userName = {'Luke Hong'}
              schoolName = {'The Childcare Centre'}
              postedDate = {'13:47 05 May 2018'}
              userImage = {'/UploadFile/fdbec8e1-ecf8-49c4-ab67-c7de67b94e3e/Photo/3f46a7c9-fed1-4fbd-b9fd-01266320151217201512172015121720151217211410.jpg'}
              files={[
                {
                  'filename': '570245_113738.pdf',
                  'url': '/UploadFile/fdbec8e1-ecf8-49c4-ab67-c7de67b94e3e/AccountV3/o_1c2it8ne81kfbeqlteqncteqka.pdf'
                },
                {
                  'filename': 'profile.jpg',
                  'url': '/UploadFile/fdbec8e1-ecf8-49c4-ab67-c7de67b94e3e/Photo/3f46a7c9-fed1-4fbd-b9fd-01266320151217201512172015121720151217211410.jpg'
                },
                {
                  'filename': 'Stepup.xlsx',
                  'url': '/UploadFile/fdbec8e1-ecf8-49c4-ab67-c7de67b94e3e/AccountV3/o_1bb3798dn1gp5tvs1avn1lch1o0aa.xlsx'
                },
                {
                  'filename': '570245_113738.pdf',
                  'url': '/UploadFile/fdbec8e1-ecf8-49c4-ab67-c7de67b94e3e/AccountV3/o_1c2it8ne81kfbeqlteqncteqka.pdf'
                },
                {
                  'filename': '570245_113738.pdf',
                  'url': '/UploadFile/fdbec8e1-ecf8-49c4-ab67-c7de67b94e3e/AccountV3/o_1c2it8ne81kfbeqlteqncteqka.pdf'
                },
              ]}
            />

          </ScrollView>
        </View>

      </View>
    );
  }
}
