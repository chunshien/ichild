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

export default class MultipleImageFeed extends PureComponent {
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

    var renderImage = (image, index) => {
      return (
        <View style={{
          width: '33%',
          padding: 5
        }}>
          <CachedImage
            style={{
              height: 130,
            }}
            source={{uri: image}}
          />
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
          numColumns={3}
          data={this.props.feedImages}
          keyExtractor={(item, index) => item}
          renderItem={({item, index}) => renderImage(item, index)}
        />


      </View>
    )
  }
}
