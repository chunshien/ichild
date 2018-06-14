import React, { PureComponent } from 'react';
import {
  View,
  Image,
  Text,
  FlatList,
  Alert,
  TouchableOpacity
} from 'react-native';

import {CachedImage} from 'react-native-cached-image';
import RNFetchBlob from 'react-native-fetch-blob';

//customize components
import FeedHeader from '../../components/Feed_FeedHeader/Feed_FeedHeader'
import FeedText from '../../components/Feed_FeedText/Feed_FeedText'

export default class SingleImageFeed extends PureComponent {
  constructor(props){
    super(props);
    this.feedTitleFontSize = 22;
    this.feedFontSize = 16;
  }

  _extention(filename){
    return (/[.]/.exec(filename)) ? /[^.]+$/.exec(filename) : undefined;
  }

  _download(filename, url){
    var date      = new Date();
    var ext       = this._extention(url);
    ext = "."+ext[0];
    const { config, fs } = RNFetchBlob
    let PictureDir = fs.dirs.DownloadDir
    let options = {
      fileCache: true,
      addAndroidDownloads : {
        useDownloadManager : true,
        notification : true,
        path:  PictureDir + '/' + filename,
        description : 'File'
      }
    }
    config(options).fetch('GET', url).then((res) => {
      Alert.alert("Success Downloaded");
    });
  }

  _initStyle(){
    if (this.props.feedTitleFontSize && this.props.feedTitleFontSize != this.feedTitleFontSize) {
      this.feedTitleFontSize = this.props.feedTitleFontSize;
    }
    if (this.props.feedFontSize && this.props.feedFontSize != this.feedFontSize) {
      this.feedFontSize = this.props.feedFontSize;
    }
  }

  render() {
    this._initStyle();

    var renderFiles = (item, index) => {
      var filename = item.filename;
      var url = item.url;
      //var temp = filename.split('.');
      //var fileType = temp[temp.length-1];
      var ext       = this._extention(url);      
      var icon;
      if(ext == 'pdf')
      {
        icon = require('../../assets/icons/pdf_icon.png');
      }
      else if(ext == 'doc' || ext == 'docx'){
        icon = require('../../assets/icons/doc_icon.png');
      }
      else if(ext == 'xls' || ext == 'xlsx'){
        icon = require('../../assets/icons/excel_icon.png');
      }
      else if(ext == 'png' || ext == 'jpg' || ext == 'jpeg'){
        icon = require('../../assets/icons/pic-icon.png');
      }
      else{
        icon = require('../../assets/icons/file_icon.png');
      }

      return (
        <TouchableOpacity style={{width: '50%'}}
          onPress={() => this._download(filename,url)}>
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
            <Image
              source={icon}
            />
            <Text numberOfLines={1} style={{flex: 1}}>{filename}</Text>
          </View>
        </TouchableOpacity>
      )
    }

    return (
      <View style={{
          backgroundColor: 'white',
          marginVertical: 5,
          paddingVertical: 20,
          paddingHorizontal: 15
      }}>

        <FeedHeader
          feedFontSize = {this.feedFontSize}
          feedTitle = {this.props.feedTitle}
          userName = {this.props.userName}
          schoolName = {this.props.schoolName}
          postedDate = {this.props.postedDate}
          userImage = {this.props.userImage}
        />
        <FeedText
          feedFontSize = {this.feedFontSize}
          feedText = {this.props.feedText}
        />

        <FlatList
          numColumns={2}
          data={this.props.files}
          keyExtractor={(item, index) => item}
          renderItem={({item, index}) => renderFiles(item, index)}
        />

      </View>
    )
  }
}
