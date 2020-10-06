import React, {useState} from 'react';
import {View, ViewStyle, Button} from 'react-native';
import OkHiLocationManager, {
  canStartAddressCreation,
  OkCollectSuccessResponse,
} from '@okhi/react-native-okcollect';
import {OkHiUser, OkHiException} from '@okhi/react-native-core';
import auth from './OkHiAuth';
import secret from './secret.json';

export default function App() {
  const [launch, setLaunch] = useState(false);

  const viewStyles: ViewStyle = {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  };

  const handleOnSuccess = (response: OkCollectSuccessResponse) => {
    // perform any logic you'd wish with user and location objects
    console.log(response.user);
    console.log(response.location);
    setLaunch(false);
  };

  const handleOnError = (error: OkHiException) => {
    console.log(error.code);
    console.log(error.message);
    setLaunch(false); // Make sure to change the launch value onError
  };

  const handleOnButtonPress = async () => {
    // Checks whether all necessary permissions and services are available in order to start the address creation process.
    const canStart = await canStartAddressCreation({requestServices: true});
    setLaunch(canStart);
  };

  const user: OkHiUser = {
    firstName: 'Julius',
    lastName: 'Kiano',
    phone: secret.phone, // Make sure its in MSISDN standard format
  };

  return (
    <View style={viewStyles}>
      <Button title="Create Address" onPress={handleOnButtonPress} />
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
