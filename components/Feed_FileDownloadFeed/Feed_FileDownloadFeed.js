import React, { PureComponent } from 'react';
import {
  View,
  Image,
  Text,
  FlatList
} from 'react-native';

import {CachedImage} from 'react-native-cached-image';

//customize components
import FeedHeader from '../../components/Feed_FeedHeader/Feed_FeedHeader'
import FeedText from '../../components/Feed_FeedText/Feed_FeedText'

export default class SingleImageFeed extends PureComponent {
  constructor(props){
    super(props);
    this.feedTitleFontSize = 22;
    this.feedFontSize = 16;
  }

  initStyle(){
    if (this.props.feedTitleFontSize && this.props.feedTitleFontSize != this.feedTitleFontSize) {
      this.feedTitleFontSize = this.props.feedTitleFontSize;
    }
    if (this.props.feedFontSize && this.props.feedFontSize != this.feedFontSize) {
      this.feedFontSize = this.props.feedFontSize;
    }
  }

  render() {
    this.initStyle();

    var renderFiles = (item, index) => {
      var filename = item.filename;
      var temp = filename.split('.');
      var fileType = temp[temp.length-1];
      var icon;
      if(fileType == 'pdf')
      {
        icon = require('../../assets/icons/pdf_icon.png');
      }
      else if(fileType == 'doc' || fileType == 'docx'){
        icon = require('../../assets/icons/doc_icon.png');
      }
      else if(fileType == 'xls' || fileType == 'xlsx'){
        icon = require('../../assets/icons/excel_icon.png');
      }
      else if(fileType == 'png' || fileType == 'jpg' || fileType == 'jpeg'){
        icon = require('../../assets/icons/pic-icon.png');
      }
      else{
        icon = require('../../assets/icons/file_icon.png');
      }

      return (
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          width: '50%',
        }}>
          <Image
            source={icon}
          />
          <Text numberOfLines={1} style={{flex: 1}}>{filename}</Text>
        </View>
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
