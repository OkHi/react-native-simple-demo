import {useEffect, useState} from 'react';
import {Button, View, ViewStyle} from 'react-native';
import {
  OkCollectSuccessResponse,
  OkHiException,
  OkHiLocationManager,
  OkHiUser,
  initialize,
  isLocationServicesEnabled,
  request,
} from 'react-native-okhi';

const App = () => {
  const [launch, setLaunch] = useState(false);
  const viewStyles: ViewStyle = {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  };

  const user: OkHiUser = {
    phone: '+2348000000000',
    firstName: 'Gift',
    lastName: 'Moore',
    email: 'giftmoore@okhi.com',
  };

  const rationale = {
    title: 'Location permissions',
    text: "To verify your address, allow My Awesome App to check your phone's location, even when you're not using the app",
    successButton: {label: 'Grant'},
    denyButton: {label: 'Deny'},
  };

  useEffect(() => {
    initialize({
      credentials: {
        branchId: '', // your branchId
        clientKey: '', // your client key
      },
      context: {
        mode: 'prod',
      },
      notification: {
        title: 'Address verification in progress',
        text: 'Tap here to view your verification status.',
        channelId: 'okhi',
        channelName: 'OkHi Channel',
        channelDescription: 'OkHi verification alerts',
      },
    })
      .then(() => console.log('init done'))
      .catch(console.log);
  }, []);

  const handleOnSuccess = async (response: OkCollectSuccessResponse) => {
    try {
      setLaunch(false);
      console.log(response.user); // perform any logic you'd wish with user and location objects
      console.log(response.location);
      const locationId = await response.startVerification();
      console.log('started verification for: ' + locationId);
    } catch (error) {
      console.log(error);
    }
  };
  const handleOnError = (error: OkHiException) => {
    setLaunch(false); // Make sure to change the launch value onError
    console.log(error.code);
    console.log(error.message);
  };

  const handleOnButtonTap = () => {
    // TODO 2: Show a location permissions educational primer before requesting for background location permissions.
    request('always', rationale, async (status, error) => {
      const locationServicesAvailable = await isLocationServicesEnabled();
      console.log(error);
      if (status === 'authorizedAlways' && locationServicesAvailable) {
        setLaunch(true);
      }
    });
  };
  return (
    <View style={viewStyles}>
      <Button title="Create address" onPress={handleOnButtonTap} />
      <OkHiLocationManager
        launch={launch}
        user={user}
        onCloseRequest={() => setLaunch(false)}
        onError={handleOnError}
        onSuccess={handleOnSuccess}
        config={{streetView: true}}
      />
    </View>
  );
};

export default App;
