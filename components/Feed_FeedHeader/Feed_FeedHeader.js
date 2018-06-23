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
    this.state = {
      source: props.userImage
    }
    this._handleOnError = this._handleOnError.bind(this)
  }

  initStyle(){
    if (this.props.feedTitleFontSize && this.props.feedTitleFontSize != this.feedTitleFontSize) {
      this.feedTitleFontSize = this.props.feedTitleFontSize;
    }
  }

  _handleOnError(error){
    this.setState({
      source: {uri: "http://www.ichild.com.sg/AccountV3/images/user_default.jpg"}
    })
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
          onError={(error)=>{
              this._handleOnError(error);
          }}
          source={{uri: this.state.source.length > 0 ? this.state.source : "http://www.ichild.com.sg/AccountV3/images/user_default.jpg"}}
          />
        <View style={{
            marginLeft: 10
          }}>
          <Text style={{fontSize: this.feedTitleFontSize, fontWeight: '400'}}>
            {this.props.feedTitle}
          </Text>
          <Text style={{lineHeight: 20}}>
            {this.props.userName} &middot; {this.props.schoolName} &middot; {this.props.postedDate}
          </Text>
        </View>
      </View>
    )
  }
}
