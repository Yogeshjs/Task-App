import React from 'react';
import {Tasks} from './src/screens/home';
import {store} from './src/store/store';
import {Provider} from 'react-redux';
import Toast from 'react-native-toast-message';
import ErrorBoundary from 'react-native-error-boundary';
import {ErrorScreen} from './src/components/error-screen/ErrorScreen';

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <ErrorBoundary FallbackComponent={ErrorScreen}>
        <Tasks />
      </ErrorBoundary>
      <Toast position="bottom" />
    </Provider>
  );
}

export default App;
