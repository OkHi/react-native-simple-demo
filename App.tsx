import React, {useState} from 'react';
import {View, ViewStyle, Button} from 'react-native';
import OkHiLocationManager, {
  OkCollectSuccessResponse,
} from '@okhi/react-native-okcollect';
import {OkHiUser, OkHiException} from '@okhi/react-native-core';
import {
  canStartVerification,
  startVerification,
  startForegroundService,
  isForegroundServiceRunning,
  stopForegroundService,
} from '@okhi/react-native-okverify';
import auth from './OkHiAuth';
import secret from './secret.json';

export default function App() {
  const [launch, setLaunch] = useState(false);

  const viewStyles: ViewStyle = {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  };

  const user: OkHiUser = {
    firstName: 'Julius',
    lastName: 'Kiano',
    phone: secret.phone, // Make sure its in MSISDN standard format
  };

  const handleOnSuccess = async (response: OkCollectSuccessResponse) => {
    try {
      setLaunch(false); // Make sure to hide OkHiLocationManager
      console.log(response.user); // perform any logic you'd wish with user and location objects
      console.log(response.location);
      const locationId = await startVerification(response); // start the verification with the response
      console.log('Successfully started verification for: ' + locationId);
      const startedForegroundService = await startForegroundService();
      console.log(
        'Foreground service running: ' +
          ((await isForegroundServiceRunning()) && startedForegroundService),
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleOnError = (error: OkHiException) => {
    setLaunch(false); // Make sure to change the launch value onError
    console.log(error.code);
    console.log(error.message);
  };

  const handleOnButtonTap = async () => {
    const canStart = await canStartVerification({requestServices: true});
    setLaunch(canStart);
  };

  const handleStopForeground = async () => {
    const stoppedForeground = await stopForegroundService();
    console.log('Foreground service stopped: ' + stoppedForeground);
  };

  return (
    <View style={viewStyles}>
      <Button title="Create Address" onPress={handleOnButtonTap} />
      <Button
        title="Stop foreground verification"
        onPress={handleStopForeground}
      />
      <OkHiLocationManager
        user={user}
        launch={launch}
        auth={auth}
        onSuccess={handleOnSuccess}
        onCloseRequest={() => setLaunch(false)} // called when user taps on the top right close button
        onError={handleOnError}
      />
    </View>
  );
}
