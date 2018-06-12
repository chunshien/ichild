import React, { Component } from 'react'
import {
    Platform,
    StyleSheet,
    Text,
    View
} from 'react-native'
import {StackNavigator} from 'react-navigation'
import AppStructure from '../assets/json/AppStructure.json'
import RouteToScreen from './RouteToScreen.js'

var stackScreens = {}

for(var i=0; i<AppStructure.length; i++){
  if( i == 0){
    stackScreens[AppStructure[i].routeName] = {
      screen: RouteToScreen[AppStructure[i].routeName],
      navigationOptions: {
        header: null
      }
    }
  }else{
    stackScreens[AppStructure[i].routeName] = {
      screen: RouteToScreen[AppStructure[i].routeName]
    }
  }
}

const StackNav = StackNavigator(
  stackScreens,
  {
    initialRouteName: AppStructure[0].routeName,
    headerMode: "screen",
    navigationOptions:{
      headerStyle: {
        backgroundColor: "#275075",
    },
      headerBackTitle: null,
      headerTintColor: "white",
      headerTitleStyle: {
        //fontFamily: 'Poppins-SemiBold',
        fontSize: 16
      },
    },
    cardStyle: {
      backgroundColor: "white"
    }
  }
)

const defaultGetStateForAction = StackNav.router.getStateForAction;

StackNav.router.getStateForAction = (action, state) => {
  // console.log(action, state);
  return defaultGetStateForAction(action, state);
};

class NavWrapper extends Component {
  render(){
    return (
      <StackNav
        onNavigationStateChange = {this._onNavigationStateChange}
        screenProps = {this.state}
      />
    )
  }
}

AppNav = NavWrapper//StackNav
export default AppNav
