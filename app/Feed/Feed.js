import React, { PureComponent } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TextInput,
  Alert,
  FlatList,
  AsyncStorage
} from 'react-native';

import Moment from 'moment';
const Entities = require('html-entities').AllHtmlEntities;
const entities = new Entities();
//customize components
import NavigationHelper from '../../components/Common_NavigationHelper/Common_NavigationHelper.js'
import StatusBarBackground from '../../components/Common_iOSStatusBar/Common_iOSStatusBar'
import HeaderSearch from '../../components/Common_HeaderSearch/Common_HeaderSearch'
import FeedItem from '../../components/Feed_FeedItem/Feed_FeedItem'
import AsyncHelper from '../../components/Common_AsyncHelper/Common_AsyncHelper.js'
import FeedAction from '../../realm/actions/FeedAction'

const API_FEED = "http://www.ichild.com.sg/WebService/ICHILD.asmx/GetBaseLists";
const TIMEOUT = 5000;

export default class Feed extends PureComponent<Props> {
  isScrolling = false

  constructor(props){
    super(props);
    //realm init
    this.FeedAction = new FeedAction()
    this.FeedAction.OpenRealmSchema();
    this._fetchFeed = this._fetchFeed.bind(this);
    this._onKeywordSearch = this._onKeywordSearch.bind(this);
    this._loadMore = this._loadMore.bind(this);
    this._onRefresh = this._onRefresh.bind(this);
    this._mergeFeed = this._mergeFeed.bind(this);

    this.state={
      feed: [],
      refreshing: false
    }

    this.feedTitleFontSize = 21;
    this.feedFontSize = 16;

    this.mobileToken = "";
    this.source = 'Mobile'
    this.pageSize = 15;
    this.pageIndex = 1;
    this.keyword = "";
    this.realmToStore = [];
    // console.log('start realm', new Date().getTime());
    AsyncStorage.getItem('UserID').then((keyValue) => {
      var feed = this.FeedAction.GetFeeds(keyValue, this.pageIndex, this.pageSize);
      console.log('end realm', new Date().getTime());
      this.setState({
        feed: feed
      })
    });
  }

  extention(filename){
    return (/[.]/.exec(filename)) ? /[^.]+$/.exec(filename) : undefined;
  }

  componentWillReceiveProps(nextProps){
    this.refs.asyncHelper._getData("MobileToken", (value)=>{
      if(value){
        this.mobileToken = value;
        this._fetchFeed(this.pageIndex);
      }
      else{
        this.refs.navigationHelper._navigate('Login', {})
      }
    })
  }

  componentDidMount(){
    this.refs.asyncHelper._getData("MobileToken", (value)=>{
      if(value){
        this.mobileToken = value;
        this._fetchFeed(this.pageIndex);
      }
      else{
        this.refs.navigationHelper._navigate('Login', {})
      }
    })
  }

  componentDidUpdate(){
    this.FeedAction.CreateFeeds(this.realmToStore);
    console.log('end', new Date().getTime());
  }

  componentWillUnmount(){
    this.FeedAction.CloseRealmSchema();
  }

  _fetchFeed(pageIndex){
    var dateTime = ''//Moment(new Date()).subtract(1, 'year').format('YYYY-MM-DD HH:mm:ss');
    var url = API_FEED;

    let param = 'ToKen='+this.mobileToken+'&From='+this.source+
    '&pageSize='+this.pageSize+'&pageIndex='+pageIndex+'&lasttime='+dateTime+
    '&keyword='+this.keyword+'&orderby='
    //console.log(url);
    fetch(url,
    {
        method: 'POST',
        headers: new Headers({'Content-Type': 'application/x-www-form-urlencoded'}),
        body: param
    }).
    then((response) => response.text()).
    then((response) => {
      if (response) {
        response=response.replace('<?xml version="1.0" encoding="utf-8"?>','')
        response=response.replace('<string xmlns="http://www.ichild.cc/">','')
        response=response.replace('</string>','');
        var responseJSON = JSON.parse(response)

        if(responseJSON.StatusCode == "0000"){
          var feed = JSON.parse(responseJSON.Remark);

          var feedJSON = this._reformatFeedJSON(feed);
          this._mergeFeed(feedJSON, pageIndex);
        }else{
          Alert.alert(
            "Error",
            "Authorization failed. Please login again.",
            [
              {text: 'Ok', onPress: () => {
                this.refs.navigationHelper._navigate('Login', {})
              }, style: 'default'},
            ],
            { cancelable: false }
          )
        }
      }
    })
    .catch((error) => {
        console.log(error);
    });
  }

  _reformatFeedJSON(feed){
    var json = {};
    feed.Table.map((main, index) => {
      var obj = {}
      obj['feed_id'] = main.BaseID;
      obj['to_user_id'] = main.ToUserID;
      obj['user_photo'] = main.HeadSculpture;
      obj['title'] = '';
      obj['desc'] = '';
      obj['content'] = '';
      obj['creator_id'] = main.Creator;
      obj['creator_name'] = '';
      obj['source'] = '';
      obj['likes'] = 0;
      obj['comments'] = 0;
      obj['downloads'] = 0;
      obj['feed_images'] = [];
      obj['feed_files'] = [];
      obj['posted_date'] = main.InsertDate;
      obj['updated_date'] = '';

      json[main.BaseID] = obj;
    });

    feed.Table2.map((content, index) => {
      var obj = json[content.BaseID];
      obj['title'] = this._decodeHtmlEntities(content.Title);
      obj['desc'] = this._decodeHtmlEntities(content.Description);
      obj['content'] = this._decodeHtmlEntities(content.Content);
      obj['creator_name'] = content.CreatorName;
      obj['source'] = content.FromName;
      obj['likes'] = content.LikeNum;
      obj['comments'] = content.CommentNum;
      obj['downloads'] = content.DownloadNum;
      obj['updated_date'] = content.UpdateTime;

    });

    feed.Table3.map((item, index) => {
      var obj = json[item.BaseID];
      var feedObj = {};
      feedObj['upload_id'] = item.UploadFileID;
      feedObj['name'] = item.Title;
      feedObj['thumbnail'] = item.ThumbnailPath;
      feedObj['path'] = item.UploadFilePath
      feedObj['type'] = item.UFType;
      feedObj['feed_id'] = item.BaseID;

      if(item.UFType == 'File'){
        obj['feed_files'].push(feedObj);
      }else{
        if(item.UFType == 'Video'){
          var str = item.UploadFilePath;
          var temp = str.split("src=\"")[1].split(" frameborder=")[0].replace("&hd=1&html5=1","");
          temp = this._reformatYoutubeLink(temp);
          feedObj['path'] = temp;
        }
        obj['feed_images'].push(feedObj);
      }

    });

    var jsonArray = [];
    for(var key in json){
      jsonArray.push(json[key]);
    }

    return jsonArray;
  }

  _reformatYoutubeLink(url){
    var newUrl = url;
    newUrl = newUrl.split('?')[0];
    var temp = newUrl.split('/');
    newUrl = temp[temp.length -1]
    newUrl = 'https://www.youtube.com/watch?v=' + newUrl;
    return newUrl;
  }

  _decodeHtmlEntities(content){
    content = entities.decode(content);
    content = content.replace(/&nbsp;/g,' ');
    return content;
  }

  _onKeywordSearch(keyword){
    this.keyword = keyword;
    this._fetchFeed();
  }

  _mergeFeed(feed, pageIndex){
    // console.log(feed);
    this.realmToStore = feed;
    var array=[]; // = this.state.feed;
    if(pageIndex==1){
      array = feed;
    }
    else{
      array = [...this.state.feed, ...feed]
    }
    //console.log(array);
    this.setState({
      feed: array
    })
  }

  _loadMore() {
    this.pageIndex++;
    this._fetchFeed(this.pageIndex);
  }

  _onRefresh(){
    this.setState({
      refreshing: true
    })
    this._fetchFeed(1);
    this.setState({
      refreshing: false
    })
  }

  render() {
    var renderFeed = (item, index) =>{
      return (
        <View>
          <FeedItem
            feedTitleFontSize = {this.feedTitleFontSize}
            feedFontSize = {this.feedFontSize}
            feedTitle = {item.title}
            feedText = {item.desc}
            userName = {item.creator_name}
            schoolName = {item.source}
            postedDate = {item.posted_date}
            userImage = {item.user_photo}
            feedImages = {item.feed_images}
            files={item.feed_files}
          />
        </View>
      )
    }
    console.log('start', new Date().getTime());
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
            onKeywordSearch = {this._onKeywordSearch}
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

        <FlatList
          data={this.state.feed}
          keyExtractor={(item, index) => item.feed_id}
          renderItem={({item, index}) => renderFeed(item, index)}
          onMomentumScrollBegin = {()=>{
            this.isScrolling = true
          }}
          removeClippedSubviews={true}
          initialNumToRender={this.state.feed.length}
          bounces={false}
          onEndReached={()=>{
            if(this.isScrolling){
              this._loadMore();
            }
          }}
          onEndReachedThreshold={0.5}
          refreshing={this.state.refreshing}
          onRefresh={this._onRefresh}
        />

        </View>

      </View>
    );
  }
}
