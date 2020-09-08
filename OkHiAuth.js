import {OkHiAuth, OkHiContext, OkHiMode} from '@okhi/react-native-core';
import {branchId, clientKey} from './secret.json';

const context = new OkHiContext({
  mode: OkHiMode.SANDBOX,
  app: {
    build: 1,
    name: 'My App',
    version: '1.0.0',
  },
});

export default OkHiAuth.withContext({branchId, clientKey}, context);
