import React, { Component } from 'react';
import {
  NavigationProvider,
  StackNavigation,
} from '@expo/ex-navigation';
import { Font } from 'expo';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import Router from './src/navigation/Router';
import Globals from './src/Globals';
import Loading from './src/components/Loading';

class App extends Component {
  state = {
    isReady: false,
  };

  async componentDidMount() {
    await Font.loadAsync({
      'Raleway': require('./assets/fonts/Raleway.ttf'),
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
      <ActionSheetProvider>
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
      </ActionSheetProvider>
    );
  }
}

export default App;
