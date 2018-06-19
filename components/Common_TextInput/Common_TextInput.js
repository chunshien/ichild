import React, { PureComponent } from 'react';
import {
  View,
  Image,
  TextInput,
  Alert
} from 'react-native';

export default class Login extends PureComponent {
  constructor(props){
    super(props);
    this.fontSize = 20;
    this._handleOnChange = this._handleOnChange.bind(this);
  }

  _handleOnChange(value){
    this.props.onChange(value);
  }

  render() {
    return (
      <View style={{flexDirection: 'row', width: '100%', height: 55}}>
          <Image
            style={{
              width: 50,
              height: 50
            }}
            source={this.props.icon} />

          <TextInput
            underlineColorAndroid={"#1f6ad6"}
            placeholder={this.props.hint}
            defaultValue={this.props.value}
            secureTextEntry={this.props.type=='password'?true:false}
            style={{
              width: '60%',
              height: 52,
              textAlignVertical: 'center',
              fontSize: this.fontSize,
              paddingLeft: 15
            }}
            onChangeText={(value) => this._handleOnChange(value)}
          />
      </View>
    )
  }

}
