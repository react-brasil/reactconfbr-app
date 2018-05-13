// @flow
import {
  StackNavigator,
  DrawerNavigator,
  SwitchNavigator,
} from 'react-navigation';
//ROUTES HELPER
import { ROUTENAMES } from './RouteNames';
// Authentications
import AuthScreen from '../screens/Auth/AuthScreen';
import LoginScreen from '../screens/Login/LoginScreen';
import RegisterScreen from '../screens/Register/RegisterScreen';
// Logged Screens
import EventsScreen from '../screens/Events/EventsScreen';
import NewEventScreen from '../screens/Event/NewEventScreen';

const NonLoggedAppRouter = StackNavigator(
  {
    [ROUTENAMES.AUTH]: { screen: AuthScreen },
    [ROUTENAMES.LOGIN]: { screen: LoginScreen },
    [ROUTENAMES.REGISTER]: { screen: RegisterScreen },
  },
  {
    initialRouteName: ROUTENAMES.AUTH,
    navigationOptions: {
      header: null,
    },
  }
);

const LoggedAppRouter = StackNavigator(
  {
    InnerAppDrawer: {
      screen: DrawerNavigator({
        [ROUTENAMES.EVENTS]: { screen: EventsScreen },
        [ROUTENAMES.NEW_EVENT]: { screen: NewEventScreen },
      }),
    },
    [ROUTENAMES.EVENTS]: { screen: EventsScreen },
    [ROUTENAMES.NEW_EVENT]: { screen: NewEventScreen },
  },
  {
    initialRouteName: ROUTENAMES.NEW_EVENT,
    navigationOptions: {
      header: null,
    },
  }
);

export const createRootNavigator = (token: string) =>
  SwitchNavigator(
    {
      [ROUTENAMES.LOGGED_APP]: LoggedAppRouter,
      [ROUTENAMES.NON_LOGGED_APP]: NonLoggedAppRouter,
    },
    {
      initialRouteName: token
        ? ROUTENAMES.LOGGED_APP
        : ROUTENAMES.NON_LOGGED_APP,
    }
  );
