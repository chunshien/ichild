import React, { Component } from 'react'
import {
    Platform,
    StyleSheet,
    Text,
    View
} from 'react-native'

//customize components
import {TabNavigator, StackNavigator} from 'react-navigation';
import AppStructure from '../assets/json/AppStructure.json';
import RouteToScreen from './RouteToScreen.js';
import HomeTabNavigator from '../components/Common_TabNavigator/Common_TabNavigator.js'

var feedImg = require('../assets/icons/feed-icon.png');
var activeFeedImg = require('../assets/icons/feed-selected-icon.png');
var profileImg = require('../assets/icons/main-icon.png');
var activeProfileImg = require('../assets/icons/main-selected-icon.png');

const itemMenu = {
    list: [
        {
            contentId: 1,
            txt: 'Feed',
            path: 'Feed',
            attachedImg: feedImg,
            activeImg: activeFeedImg,
        },
        // {
        //     contentId: 2,
        //     txt: 'Profile',
        //     path: 'Profile',
        //     attachedImg: profileImg,
        //     activeImg: activeProfileImg,
        // },
    ]
}
var tabScreens = {}
var stackScreens = {}

for(var i=0; i<AppStructure.length; i++){
  if(AppStructure[i].routeName == 'Home'){
    for(var j=0; j<AppStructure[0].children.length; j++){
      tabScreens[AppStructure[0].children[j].routeName] = {
        screen: RouteToScreen[AppStructure[0].children[j].routeName]
      }
    }
  }
  else if( AppStructure[i].routeName == 'Login'){
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

const TabNav = TabNavigator(
  tabScreens,
  {
    tabBarComponent: (({navigation}) =>
      <HomeTabNavigator
        backgroundColor={'#f8f8f8'}
        textColor={'#4a4a4a'}
        activeTextColor={'#275075'}
        itemMenu={itemMenu}
        navigation={navigation}
      />),
    tabBarPosition: 'bottom',
    swipeEnabled: false,
    initialRouteName: AppStructure[0].children[0].routeName, // set inital route
    lazy: true,
  }
)

class TabNavContainer extends Component {
  render() {
    return (
      <TabNav
        screenProps = {this.props.screenProps}
        navigation = {this.props.navigation}
      />
    )
  }
}
TabNavContainer.router = TabNav.router

stackScreens[AppStructure[0].routeName] = {
  screen: TabNavContainer,
  navigationOptions: {
    header: null
  }
}

const StackNav = StackNavigator(
  stackScreens,
  {
    initialRouteName: AppStructure[0].routeName,
    headerMode: "screen",
    navigationOptions:{
      headerStyle: {
        backgroundColor: "#3a8ebc",
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
