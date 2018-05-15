import React from 'react';
import { AsyncStorage } from 'react-native';
import { ThemeProvider } from 'styled-components';
import theme from './utils/design/theme';
import { createRootNavigator } from './navigation/Router';
import Provider from './Context';

type State = {
  token: '',
};

class ThemedApp extends React.Component<*, State> {

  state = {
    token: '',
  };

  componentWillMount() {
    AsyncStorage.getItem('token').then(value => {
      this.setState({
        token: value,
      });
    });
  }
  render() {
    const { token } = this.state;

    const Launch = createRootNavigator(token);
    return (
        <ThemeProvider theme={theme}>
          <Provider>
            <Launch />
          </Provider>
        </ThemeProvider>
    );
  }
}

export default ThemedApp;
