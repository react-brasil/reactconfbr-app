import { StackNavigator, DrawerNavigator } from 'react-navigation';

//ROUTES HELPER
import { ROUTENAMES } from './RouteNames';

//Authentication screens
import AuthScreen from '../screens/Auth/AuthScreen';
import LoginScreen from '../screens/Login/LoginScreen';
import RegisterScreen from '../screens/Register/RegisterScreen';

//App Screens
import EventsScreen from '../screens/Events/EventsScreen';

const InnerAppRouter = StackNavigator(
  {
    [ROUTENAMES.AUTH]: { screen: AuthScreen },
    [ROUTENAMES.LOGIN]: { screen: LoginScreen },
    [ROUTENAMES.REGISTER]: { screen: RegisterScreen },

    [ROUTENAMES.EVENTS]: { screen: EventsScreen },
  },
  {
    initialRouteName: ROUTENAMES.AUTH,
    navigationOptions: {
      header: null,
    },
  }
);

export const RelayApp = StackNavigator(
  {
    InnerAppRouter: {
      screen: DrawerNavigator({
        MainApp: {
          screen: InnerAppRouter,
        },
      }),
    },
  },
  {
    headerMode: 'none',
  }
);
