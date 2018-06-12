import React, { PureComponent } from 'react';
import {
  View,
  Image,
  TextInput
} from 'react-native';

export default class Login extends PureComponent {
  constructor(props){
    super(props);
    this.fontSize = 20;
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
            underlineColorAndroid={"#0041cb"}
            placeholder={this.props.hint}
            style={{
              width: '60%',
              height: 52,
              textAlignVertical: 'center',
              fontSize: this.fontSize,
              paddingLeft: 15
            }}
          />
      </View>
    )
  }

}
