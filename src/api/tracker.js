import axios from "axios"
import { AsyncStorage } from "react-native"

const instance = axios.create({
  baseURL: "https://map-tracks.herokuapp.com/",
})

instance.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("token")
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
      //every time we make a request if we have a token, it will add this bearer as header for the request
    }
    return config
  }, //runs everytime we make request
  (err) => {
    return Promise.reject(err)
  } // runs everytime when request got error
)

export default instance
