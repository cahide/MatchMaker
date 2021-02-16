import React, {Component} from 'react';
import {
    Alert,
    AppState,
    BackHandler,
    Keyboard,
    Linking,
    Platform,
    StatusBar,
    Text,
    View,
    YellowBox
} from 'react-native';

import {FetchGet, FetchPost} from "MatchMaker/src/Utils/Fetch/";
import SplashScreen from 'react-native-splash-screen';
//import NoInternetPopup from "MatchMaker/src/Utils/NoInternetPopup";
import NetInfo from "@react-native-community/netinfo";


import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

export default class App extends Component {
  constructor() {
    super();


  }  
  componentDidMount() {
    // do stuff while splash screen is shown
      // After having done stuff (such as async tasks) hide the splash screen
      SplashScreen.hide();
  }

  render () {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}  

  export class HomeScreen extends Component {
    constructor(prop) {
      super(prop);
      this.state = {
      };
      this.statusBar = "dark-content";
  }
    render() {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text>Home Screen</Text>
        </View>
      );
    }
  }


const Stack = createStackNavigator();