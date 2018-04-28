import React, { Component } from 'react';
import { StatusBar } from 'react-native';
import StackNavigator from './src/navigation/Router';
import { Font } from 'expo';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import Loading from './src/components/Loading';

class App extends Component {
  state = {
    isReady: false
  };

  async componentDidMount() {
    await Font.loadAsync({
      'OpenSans-ExtraBold': require('./assets/fonts/OpenSans-ExtraBold.ttf'),
      'OpenSans-Regular': require('./assets/fonts/OpenSans-Regular.ttf')
    });

    this.setState({
      isReady: true
    });
  }

  render() {
    StatusBar.setBarStyle('light-content', true)
    
    if (!this.state.isReady) {
      return <Loading fullScreen={true} />;
    }

    return (
      <ActionSheetProvider>
        <StackNavigator />
      </ActionSheetProvider>
    );
  }
}

export default App;
