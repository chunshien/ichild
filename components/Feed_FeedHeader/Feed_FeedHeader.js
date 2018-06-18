import React, { PureComponent } from 'react';
import {
  View,
  Image,
  Text
} from 'react-native';

import {CachedImage} from 'react-native-cached-image';

export default class FeedHeader extends PureComponent {
  constructor(props){
    super(props);
    this.feedTitleFontSize = 22;
  }

  initStyle(){
    if (this.props.feedTitleFontSize && this.props.feedTitleFontSize != this.feedTitleFontSize) {
      this.feedTitleFontSize = this.props.feedTitleFontSize;
    }
  }

  render() {
    this.initStyle();

    return (
      <View style={{flexDirection: 'row'}}>
        <CachedImage
          style={{
            width: 75,
            height: 75,
            borderRadius: 100,
            borderWidth: 0.75,
            borderColor: '#e7f0f1'
          }}
          source={{uri: this.props.userImage}}
          />
        <View style={{
            marginLeft: 10
          }}>
          <Text style={{fontSize: this.feedTitleFontSize, fontWeight: '400'}}>
            {this.props.feedTitle}
          </Text>
          <Text style={{lineHeight: 20}}>
            {this.props.userName} &middot; {this.props.schoolName} &middot; {this.props.postedDate} &middot; Owner
          </Text>
        </View>
      </View>
    )
  }
}
