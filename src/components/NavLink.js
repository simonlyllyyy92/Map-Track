import React from "react"
import { Text, TouchableOpacity, StyleSheet } from "react-native"
import Spacer from "./Spacer"
import { withNavigation } from "react-navigation"
/**@withNavigation
 * if there is a reusable component inside a screens
 * that are contained in the navigation in app.js
 * we can either pass the navigation props from those screens
 * down to these reusable componet, or use withNavigation
 */

const NavLink = ({ navigation, text, routeName }) => {
  return (
    <TouchableOpacity onPress={() => navigation.navigate(routeName)}>
      <Spacer>
        <Text style={styles.link}>{text}</Text>
      </Spacer>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  link: {
    color: "blue",
  },
})

export default withNavigation(NavLink)
