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
      'OpenSans-ExtraBold': require('./assets/fonts/OpenSans-ExtraBold.ttf'),
      'OpenSans-Regular': require('./assets/fonts/OpenSans-Regular.ttf'),
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
                fontFamily: 'OpenSans-ExtraBold',
              },
            }}
          />
        </NavigationProvider>
      </ActionSheetProvider>
    );
  }
}

export default App;
