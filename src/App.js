import React from 'react';
import { StackNavigator, DrawerNavigator } from 'react-navigation';
import { ThemeProvider } from 'styled-components';
import theme from './utils/design/theme';

//Authentication screens
import AuthScreen from './screens/Auth/AuthScreen';
import LoginScreen from './screens/Login/LoginScreen';
import RegisterScreen from './screens/Register/RegisterScreen';

//App Screens
import EventsScreen from './screens/Events/EventsScreen';

import UserCreate from './UserCreate';
import UserList from './UserList';
import UserDetail from './UserDetail';

const InnerAppRouter = StackNavigator(
  {
    AuthScreen: { screen: AuthScreen },
    LoginScreen: { screen: LoginScreen },
    RegisterScreen: { screen: RegisterScreen },

    EventsScreen: { screen: EventsScreen },

    UserCreate: { screen: UserCreate },
    UserList: { screen: UserList },
    UserDetail: { screen: UserDetail },
  },
  {
    initialRouteName: 'AuthScreen',
    navigationOptions: {
      header: null,
    },
  },
);

const RelayApp = StackNavigator(
  {
    InnerAppRouter: {
      screen: DrawerNavigator(
        {
          MainApp: {
            screen: InnerAppRouter,
          },
        },
      ),
    },
  },
  {
    headerMode: 'none',
  },
);

const ThemedApp = () => <ThemeProvider theme={theme}><RelayApp /></ThemeProvider>;

export default () => <ThemedApp />;
