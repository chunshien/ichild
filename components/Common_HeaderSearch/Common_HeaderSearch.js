import React, { PureComponent } from 'react';
import {
  View,
  Image,
  TextInput,
  TouchableHighlight,
} from 'react-native';

export default class Login extends PureComponent {
  constructor(props){
    super(props);
    this._onKeywordSearch = this._onKeywordSearch.bind(this);
    this.state={
      keyword: ''
    }
    this.fontSize = 16;
    this.iconSize = 35;
    this.iconBackgroundColor = "white";
    this.height = 30;
    this.borderRadius = 5;
  }

  initStyle(){
    if (this.props.fontSize && this.props.fontSize != this.fontSize) {
      this.fontSize = this.props.fontSize;
    }
    if (this.props.iconSize && this.props.iconSize != this.iconSize) {
      this.iconSize = this.props.iconSize;
    }
    if (this.props.iconBackgroundColor && this.props.iconBackgroundColor != this.iconBackgroundColor) {
      this.iconBackgroundColor = this.props.iconBackgroundColor;
    }
    if (this.props.height && this.props.height != this.height) {
      this.height = this.props.height;
    }
    if (this.props.borderRadius && this.props.borderRadius != this.borderRadius) {
      this.borderRadius = this.props.borderRadius;
    }
  }

  _onKeywordSearch(){
    this.props.onKeywordSearch(this.state.keyword);
  }

  render() {
    this.initStyle();

    return (
      <View style={{
          flex: 1,
          flexDirection: 'row',
          marginHorizontal: 10,
          backgroundColor: 'white',
          height: this.height,
          borderRadius: this.borderRadius,
          justifyContent: 'center',
          alignItems: 'center'
      }}>
        <TextInput
          underlineColorAndroid="transparent"
          autoCorrect={false}
          placeholder={this.props.hint}
          onChangeText={(keyword) => this.setState({keyword})}
          style={{
            flex: 1,
            textAlignVertical: 'center',
            fontSize: this.fontSize,
            paddingVertical: 5,
            paddingHorizontal: 10
          }}
        />

        <TouchableHighlight
          style={{
            backgroundColor: this.iconBackgroundColor,
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            width: this.iconSize + 5,
            borderTopRightRadius: this.borderRadius,
            borderBottomRightRadius: this.borderRadius,
          }}
          onPress={() => this._onKeywordSearch()}
          underlayColor='#fff'
        >
          <Image
            style={{
              width: this.iconSize,
              height: this.iconSize,
            }}
            source={this.props.icon} />
        </TouchableHighlight>

      </View>
    )
  }

}
