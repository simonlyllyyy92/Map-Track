# Map-Track

1. After cloning, forward to the Map-Track folder and run yarn to install the packages
2. To run this app, enter expo start
3. Then Press i on the terminal to run on the simulator, or use the camera on physical devices to scan the code on the terminal to run on the phone. If you want to run on physical devices. you need to download expo client app before scanning the code.

# if you are running on the simulator

To test it out with some fake data and locations, you need to simply uncomment the " import ../\_mockLocation" from 'src/sreens/TrackCreateScreen'.

# if you are using an actual devices.

You need to comment out the "import ../\_mockLocation" from 'src/sreens/TrackCreateScreen' before testing.

The BaseUrl has been settled. As the custom express server has been successfully deployed. ngrok is no longer being used in this app
