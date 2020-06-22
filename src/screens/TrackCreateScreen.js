import React, { useContext, useCallback } from "react"

import { StyleSheet } from "react-native"
import { Text } from "react-native-elements"
import Map from "../components/Map"
import { SafeAreaView, withNavigationFocus } from "react-navigation"
import { Context as LocationContext } from "../context/LocationContext"
import useLocation from "../hooks/useLocation"
import TrackForm from "../components/TrackForm"
import { FontAwesome } from "@expo/vector-icons"
// test
// import "../_mockLocation"

//withNavigationFocus decide whether currently we are focusing on this page
const TrackCreateScreen = ({ isFocused }) => {
  const { state, addLocation } = useContext(LocationContext)
  const callback = useCallback(
    (location) => {
      addLocation(location, state.recording)
    },
    [state.recording]
  )
  const [err] = useLocation(isFocused || state.recording, callback)

  return (
    <SafeAreaView forceInset={{ top: "always" }}>
      <Map />
      {err ? <Text>Please enable location services</Text> : null}
      <TrackForm />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({})

export default withNavigationFocus(TrackCreateScreen)
