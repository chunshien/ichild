import React, { PureComponent } from 'react';
import {
  View,
  Image,
  Text
} from 'react-native';

import {CachedImage} from 'react-native-cached-image';
import Moment from 'moment';

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
      source: ""
    })
  }

  render() {
    this.initStyle();
    var circleSize = 75;
    var circleFixBorder = 0.75;
    var bgColor = "#e7f0f1";
    //"http://www.ichild.com.sg/AccountV3/images/user_default.jpg"
    return (
      <View style={{flexDirection: 'row'}}>

        {this.state.source.length > 0 ?
          <CachedImage
            style={{
              width: circleSize,
              height: circleSize,
              borderRadius: 100,
              borderWidth: circleFixBorder,
              borderColor: bgColor
            }}
            onError={(error)=>{
                this._handleOnError(error);
            }}
            resizeMode={'cover'}
            source={{uri: this.state.source}}
            />
          :
          <View style={{
            overflow: 'hidden',
            borderRadius: 100,
            borderWidth: circleFixBorder,
            borderColor: bgColor
            }}>
            <CachedImage
              style={{
                width: circleSize,
                height: circleSize,
              }}
              resizeMode={'contain'}
              source={require('../../assets/icons/logo.png')}
              />
          </View>
        }


        <View style={{
            marginLeft: 10,
            flex: 1
          }}>
          <Text style={{fontSize: this.feedTitleFontSize, fontWeight: '400', flexWrap: 'wrap'}}>
            {this.props.feedTitle}
          </Text>
          <Text style={{lineHeight: 20, flexWrap: 'wrap'}}>
            {this.props.userName} &middot;&nbsp;
            {this.props.schoolName} &middot;&nbsp;
            {Moment(this.props.postedDate).format('HH:mm DD/MM/YYYY')}
          </Text>
        </View>
      </View>
    )
  }
}
