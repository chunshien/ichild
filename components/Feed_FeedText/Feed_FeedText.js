import React, { PureComponent } from 'react';
import {
  View,
  Text
} from 'react-native';

export default class FeedText extends PureComponent {
  constructor(props){
    super(props);
    this.feedFontSize = 16;
  }

  initStyle(){
    if (this.props.feedFontSize && this.props.feedFontSize != this.feedFontSize) {
      this.feedFontSize = this.props.feedFontSize;
    }
  }

  render() {
    this.initStyle();

    return (
      <View style={{paddingVertical: 10}}>
        <Text style={{lineHeight: 20, fontSize: this.feedFontSize}}>
          {this.props.feedText}
        </Text>
        <Text style={{lineHeight: 20, marginBottom: 10, fontSize: this.feedFontSize, alignSelf: 'flex-end', fontWeight: 'bold'}}>
          ... Read More
        </Text>
      </View>
    )
  }
}
