import React from 'react';
import Expo from 'expo';
import {
  createRouter,
  NavigationProvider,
  StackNavigation,
} from '@expo/ex-navigation';
import HomeScreen from './screens/HomeScreen';

const Router = createRouter(() => ({
  home: () => HomeScreen,
}));

export default class App extends React.Component {
  render() {
    return (
      <NavigationProvider router={Router}>
        <StackNavigation initialRoute={Router.getRoute('home')} />
      </NavigationProvider>
    );
  }
}