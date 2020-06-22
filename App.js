import React from "react"

import { createAppContainer, createSwitchNavigator } from "react-navigation"
import { createStackNavigator } from "react-navigation-stack"
import { createBottomTabNavigator } from "react-navigation-tabs"

import AccountScreen from "./src/screens/AccountScreen"
import SigninScreen from "./src/screens/SigninScreen"
import SignupScreen from "./src/screens/SignupScreen"
import TrackCreateScreen from "./src/screens/TrackCreateScreen"
import TrackDetailScreen from "./src/screens/TrackDetailScreen"
import TrackListScreen from "./src/screens/TrackListScreen"
import ResolveAuthScreen from "./src/screens/ResolveAuth"

//Context
import { Provider as AuthProvider } from "./src/context/AuthContext"
import { Provider as LocationProvider } from "./src/context/LocationContext"
import { Provider as TrackProvider } from "./src/context/TrackContext"

//navigator
import { setNavigator } from "./src/navigationRef"

import { FontAwesome } from "@expo/vector-icons"
import { Ionicons } from "@expo/vector-icons"

const trackListFlow = createStackNavigator({
  TrackList: TrackListScreen,
  TrackDetail: TrackDetailScreen,
})

trackListFlow.navigationOptions = () => {
  return {
    title: "Track",
    tabBarIcon: <FontAwesome name="th-list" size={20} color="black" />,
  }
}

const trackCreateFlow = createStackNavigator({
  CreateTrack: TrackCreateScreen,
})

trackCreateFlow.navigationOptions = {
  title: "Create Track",
  tabBarIcon: <FontAwesome name="plus" size={20} color="black" />,
}

const accountFlow = createStackNavigator({
  Account: AccountScreen,
})

accountFlow.navigationOptions = () => {
  return {
    title: "Log out",
    tabBarIcon: <Ionicons name="md-settings" size={20} color="black" />,
  }
}

const switchNavigator = createSwitchNavigator({
  ResolveAuth: ResolveAuthScreen,
  loginFlow: createStackNavigator({
    Signup: SignupScreen,
    Signin: SigninScreen,
  }),
  mainFlow: createBottomTabNavigator({
    trackListFlow,
    TrackCreate: trackCreateFlow,
    Account: accountFlow,
  }),
})

const App = createAppContainer(switchNavigator)

export default () => {
  return (
    <TrackProvider>
      <LocationProvider>
        <AuthProvider>
          <App
            ref={(navigator) => {
              setNavigator(navigator)
            }}
          />
        </AuthProvider>
      </LocationProvider>
    </TrackProvider>
  )
}
