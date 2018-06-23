import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TextInput,
  Alert
} from 'react-native';
import Moment from 'moment';

//customize components
import NavigationHelper from '../../components/Common_NavigationHelper/Common_NavigationHelper.js'
import StatusBarBackground from '../../components/Common_iOSStatusBar/Common_iOSStatusBar'
import HeaderSearch from '../../components/Common_HeaderSearch/Common_HeaderSearch'
import FeedItem from '../../components/Feed_FeedItem/Feed_FeedItem'
import AsyncHelper from '../../components/Common_AsyncHelper/Common_AsyncHelper.js'

const API_FEED = "http://www.ichild.com.sg/WebService/ICHILD.asmx/GetBaseLists";
const TIMEOUT = 5000;

export default class Feed extends Component<Props> {
  constructor(props){
    super(props);
    this._fetchFeed = this._fetchFeed.bind(this);

    this.feedTitleFontSize = 22;
    this.feedFontSize = 16;

    this.mobileToken = "";
    this.source = 'Mobile'
    this.pageSize = 15;
    this.pageIndex = 1;
    this.keyword = "";
  }

  extention(filename){
    return (/[.]/.exec(filename)) ? /[^.]+$/.exec(filename) : undefined;
  }

  componentWillReceiveProps(nextProps){
    // this.refs.asyncHelper._getData("MobileToken", (value)=>{
    //   Alert.alert(value);
    // })
  }

  componentDidMount(){
    this.refs.asyncHelper._getData("MobileToken", (value)=>{
      if(value){
        this.mobileToken = value;
        this._fetchFeed();
      }
      else{
        this.refs.navigationHelper._navigate('Login', {})
        // Alert.alert(
        //   "Error",
        //   "Authorization failed. Please login again.",
        //   [
        //     {text: 'Ok', onPress: () => {
        //       this.refs.navigationHelper._navigate('Login', {})
        //     }, style: 'default'},
        //   ],
        //   { cancelable: false }
        // )
      }
    })
  }

  _fetchFeed(){
    var dateTime = Moment(new Date()).subtract(1, 'year').format('YYYY-MM-DD HH:mm:ss');
    var url = API_FEED;
    let param = 'ToKen='+this.mobileToken+'&From='+this.source+
    '&pageSize='+this.pageSize+'&pageIndex='+this.pageIndex+'&lasttime='+dateTime+
    '&keyword='+this.keyword+'&orderby='
    console.log(url);
    fetch(url,
    {
        method: 'POST',
        headers: new Headers({'Content-Type': 'application/x-www-form-urlencoded'}),
        body: param
    }).
    then((response) => response.text()).
    then((response) => {
      // if (response) {
      //
      // }
      console.log(response);
    })
    .catch((error) => {
        console.log(error);
    });

  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <StatusBarBackground lightContent={true} style={{ backgroundColor: '#3a8ebc' }} />
        <AsyncHelper ref={"asyncHelper"}/>
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
          {/*<Image
              style={{
                width: 35,
                height: 35,
                alignSelf: 'flex-end',
              }}
              source={require('../../assets/icons/message_icon.png')} />
            */}
        </View>


        <View style={{
            flex: 1,
            backgroundColor: '#e7f0f1',
            paddingVertical: 5
        }}>
          <ScrollView>
            {/*
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
            */}
          </ScrollView>
        </View>

      </View>
    );
  }
}
