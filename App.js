import React, { Component } from 'react';
import {
  Platform,
  View
} from 'react-native';
import AppNav from './app/AppNav'

type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <AppNav />
    );
  }
}
