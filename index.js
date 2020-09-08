/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import * as OkVerify from '@okhi/react-native-okverify';

OkVerify.init({
  channelId: 'okhi',
  channelDescription: 'OkHi verification alerts',
  channelName: 'OkHi Verification',
  title: 'Verification in progress',
  text: 'This will only take a second',
});

AppRegistry.registerComponent(appName, () => App);
