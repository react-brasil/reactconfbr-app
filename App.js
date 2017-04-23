import React, { Component } from 'react';
import {
  NavigationProvider,
  StackNavigation,
} from '@expo/ex-navigation';
import { Font } from 'expo';

import Router from './src/navigation/Router';
import Globals from './src/Globals';
import Loading from './src/components/Loading';

class App extends Component {
  state = {
    isReady: false,
  };

  async componentDidMount() {
    await Font.loadAsync({
      'Roboto': require('./assets/fonts/Roboto.ttf'),
    });

    this.setState({
      isReady: true,
    })
  }

  render() {
    if (!this.state.isReady) {
      return <Loading fullScreen={true} />;
    }

    return (
      <NavigationProvider router={Router}>
        <StackNavigation
          initialRoute={Router.getRoute('home')}
          defaultRouteConfig={{
            navigationBar: {
              backgroundColor: Globals.colors.primary_black,
              tintColor: Globals.colors.primary_blue,
            },
          }}
        />
      </NavigationProvider>
    );
  }
}

export default App;
