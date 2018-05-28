// @flow
import { StackNavigator, DrawerNavigator, SwitchNavigator } from 'react-navigation';
//ROUTES HELPER
import { ROUTENAMES } from './RouteNames';
// Authentications
import AuthScreen from '../screens/Auth/AuthScreen';
import LoginScreen from '../screens/Login/LoginScreen';
import RegisterScreen from '../screens/Register/RegisterScreen';
// Logged Screens
import EventsScreen from '../screens/Events/EventsScreen';
import EventAdd from '../screens/Event/EventAdd';
import EventDetails from '../screens/Event/EventDetails';

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
  },
);

const LoggedAppRouter = StackNavigator(
  {
    InnerAppDrawer: {
      screen: DrawerNavigator({
        [ROUTENAMES.EVENTS]: { screen: EventsScreen },
        [ROUTENAMES.EVENT_ADD]: { screen: EventAdd },
      }),
    },
    [ROUTENAMES.EVENTS]: { screen: EventsScreen },
    [ROUTENAMES.EVENT_ADD]: { screen: EventAdd },
    [ROUTENAMES.EVENT_DETTAILS]: { screen: EventDetails },
  },
  {
    initialRouteName: ROUTENAMES.EVENTS,
    navigationOptions: {
      header: null,
    },
  },
);

export const createRootNavigator = (token: string) =>
  SwitchNavigator(
    {
      [ROUTENAMES.LOGGED_APP]: LoggedAppRouter,
      [ROUTENAMES.NON_LOGGED_APP]: NonLoggedAppRouter,
    },
    {
      initialRouteName: token ? ROUTENAMES.LOGGED_APP : ROUTENAMES.NON_LOGGED_APP,
    },
  );
