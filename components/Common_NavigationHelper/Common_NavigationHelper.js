import React, { Component } from 'react'
import {
    View,
} from 'react-native'
import {NavigationActions} from 'react-navigation'
import AppStructure from '../../assets/json/AppStructure.json'

export default class NavigationHelper extends Component{
  navigation;
  screenName;
  params;
  isTab = false
  tabRoutes = ""

  constructor(props){
    super(props);
    this.navigation = props.navigation
    this.params = props.navigation.state.params || {}
    this.screenName = this.navigation.state.routeName

    this._navigate = this._navigate.bind(this)
  }

  shouldComponentUpdate(nextProps){
    //return(nextProps.navigation!==this.props.navigation||nextProps.navigation.state.params!==this.props.navigation.state.params||nextProps.screenName!==this.props.screenName)
    return false
}
  _navigate(screen, params){
    //check if next screen is same as current screen
    if(screen){
      if(!(screen == this.screenName && JSON.stringify(params.data) == JSON.stringify(this.params.data))){
        //if next screen is tab,
        if(this.tabRoutes.indexOf(screen) > -1){
          //if current screen is a tab, just navigate
          if(this.isTab){
            this.navigation.navigate(screen, params)
          }
          //if current screen is not a tab, go back to tab and navigate from tab
          else{
            if(this.params.nav && this.params.nav.goBackTab && this.params.nav.navigateFromTab){
              this.params.nav.goBackTab();
              this.params.nav.navigateFromTab(screen, params)
            }
          }
        }
        //if next screen is not a tab
        else{
          //if current screen is a tab
          if(this.isTab){
            var nav = {
              navigateFromTab: this._navigate
            }
          }
          //else just copy nav and navigate
          else{
            var nav = this.params.nav
          }
          params.nav = nav
          this.navigation.navigate(screen, params)
        }
      }
    }
  }

  _navigateInMenu(screen, params){
    this._navigate(screen, params)
  }

  render(){
    return(<View/>)
  }
}
