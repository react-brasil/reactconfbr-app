import { StackNavigator } from 'react-navigation';
import Globals from '../Globals';
import Home from '../screens/Home';
import Schedule from '../screens/Schedule';
import Location from '../screens/Location';
import About from '../screens/About';

const navigationOptions = () => ({
  headerTintColor: Globals.colors.primary_blue,
  headerStyle: {
    backgroundColor: Globals.colors.primary_black,
    marginTop: 25
  },
  headerTitleStyle: {
    color: Globals.colors.primary_blue,
    fontFamily: 'OpenSans-ExtraBold'
  }
});

const Routes = {
  home: {
    screen: Home,
    navigationOptions: {
      header: null
    }
  },
  schedule: {
    screen: Schedule,
    navigationOptions: navigationOptions
  },
  location: {
    screen: Location,
    navigationOptions: navigationOptions
  },
  about: {
    screen: About,
    navigationOptions: navigationOptions
  }
};

const Config = {};

export default StackNavigator(Routes, Config);
