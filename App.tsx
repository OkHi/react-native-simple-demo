import React, {useState, useEffect} from 'react';
import {View, ViewStyle, Button} from 'react-native';
import OkHiLocationManager, {
  OkCollectSuccessResponse,
} from '@okhi/react-native-okcollect';
import {OkHiUser, OkHiException} from '@okhi/react-native-core';
import {
  canStartVerification,
  startVerification,
} from '@okhi/react-native-okverify';
import auth from './OkHiAuth';
import secret from './secret.json';

export default function App() {
  const [launch, setLaunch] = useState(false);
  const [conditionsMet, setConditionsMet] = useState(false);
  useEffect(() => {
    async function requestPermissions() {
      const result = await canStartVerification({
        requestServices: true,
      });
      setConditionsMet(result);
    }
    requestPermissions();
  }, []);

  const viewStyles: ViewStyle = {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  };

  const handleOnSuccess = async (response: OkCollectSuccessResponse) => {
    // perform any logic you'd wish with user and location objects
    try {
      console.log(response.user);
      console.log(response.location);
      setLaunch(false);
      if (conditionsMet) {
        // check if permissions were granted
        const result = await startVerification(response);
        console.log('Verification started for: ' + result);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleOnError = (error: OkHiException) => {
    console.log(error.code);
    console.log(error.message);
    setLaunch(false); // Make sure to change the launch value onError
  };

  const user: OkHiUser = {
    firstName: 'Julius',
    lastName: 'Kiano',
    phone: secret.phone, // Make sure its in MSISDN standard format
  };

  return (
    <View style={viewStyles}>
      <Button title="Create Address" onPress={() => setLaunch(true)} />
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
