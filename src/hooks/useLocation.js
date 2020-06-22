import { useState, useEffect } from "react"

import {
  Accuracy,
  requestPermissionsAsync,
  watchPositionAsync,
} from "expo-location"

export default (shouldTrack, callback) => {
  const [err, setErr] = useState(null)

  useEffect(() => {
    let subscriber
    const startWatching = async () => {
      try {
        await requestPermissionsAsync()
        subscriber = await watchPositionAsync(
          {
            accuracy: Accuracy.BestForNavigation,
            timeInterval: 1000, // either once every 1 sec or once every 10 meters
            distanceInterval: 10,
          },
          callback
        )
      } catch (e) {
        setErr(e)
      }
    }

    if (shouldTrack) {
      startWatching()
    } else {
      //stop
      if (subscriber) {
        subscriber.remove()
      }
      subscriber = null
    }
    // here the first time we did not run the return function
    // it just simply return this function we can understand like this
    // userEffect(()=>{...}) === () > { if(subscriber) .....} the next time we run this useEffect,
    // we will run this return function first then we start watching
    return () => {
      if (subscriber) {
        subscriber.remove()
      }
    }
  }, [shouldTrack, callback])

  return [err]
}
