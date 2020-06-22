import createDataContext from "./CreateDataContext"
import trackerApi from "../api/tracker"
import { AsyncStorage } from "react-native"
import { navigate } from "../navigationRef"

const authReducer = (state, action) => {
  switch (action.type) {
    case "signin&up":
      return {
        errorMessage: "",
        token: action.payload,
      }
    case "signout":
      return {
        token: null,
        errorMessage: "",
      }
    case "add_err":
      return {
        ...state,
        errorMessage: action.payload,
      }
    case "clear_error_message":
      return { ...state, errorMessage: "" }
    default:
      return state
  }
}

const tryLocalSignin = (dispatch) => async () => {
  const token = await AsyncStorage.getItem("token")
  if (token) {
    dispatch({ type: "signin&up", payload: token })
    navigate("TrackList")
  } else {
    navigate("loginFlow")
  }
}

const clearErrorMessage = (dispatch) => {
  return () => {
    dispatch({ type: "clear_error_message" })
  }
}

const signup = (dispatch) => {
  return async ({ email, password }) => {
    try {
      const res = await trackerApi.post("/signup", { email, password })
      await AsyncStorage.setItem("token", res.data.token)
      dispatch({ type: "signin&up", payload: res.data.token })
      navigate("TrackList")
    } catch (e) {
      dispatch({
        type: "add_err",
        payload: "Something went wrong with sign up",
      })
    }
  }
}

const signin = (dispatch) => {
  return async ({ email, password }) => {
    try {
      const res = await trackerApi.post("/signin", { email, password })
      await AsyncStorage.setItem("token", res.data.token)
      dispatch({ type: "signin&up", payload: res.data.token })
      navigate("TrackList")
    } catch (e) {
      dispatch({
        type: "add_err",
        payload: "Something went wrong with sign in",
      })
    }
  }
}

const signout = (dispatch) => {
  return async () => {
    await AsyncStorage.removeItem("token")
    dispatch({ type: "signout" })
    navigate("loginFlow")
  }
}

export const { Provider, Context } = createDataContext(
  authReducer,
  { signin: signin, signout, signup, clearErrorMessage, tryLocalSignin },
  { token: null, errorMessage: "" }
)
