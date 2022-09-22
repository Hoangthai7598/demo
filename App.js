import * as React from 'react';
import AppContainer from './src/AppContainer';
import { GestureHandlerRootView } from 'react-native-gesture-handler';


const App = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AppContainer />
    </GestureHandlerRootView>
  );
};

export default App;
