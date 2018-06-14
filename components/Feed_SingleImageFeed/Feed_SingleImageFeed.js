import React, { PureComponent } from 'react';
import {
  View,
  Image,
  Text
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

    return (
      <View style={{
          backgroundColor: 'white',
          marginVertical: 5,
          paddingVertical: 20,
          paddingHorizontal: 15
      }}>

        <FeedHeader
          feedTitleFontSize = {this.feedTitleFontSize}
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
        <CachedImage
          style={{
            width: '100%',
            height: 300,
          }}
          source={{uri: this.props.feedImage}}
        />

      </View>
    )
  }
}
