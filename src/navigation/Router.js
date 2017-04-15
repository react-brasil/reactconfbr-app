import { createRouter } from '@expo/ex-navigation';
import Home from '../screens/Home';
import Schedule from '../screens/Schedule';
import Location from '../screens/Location';
import About from '../screens/About';

const Router = createRouter(() => ({
	home: () => Home,
	schedule: () => Schedule,
	location: () => Location,
	about: () => About,
}));

export default Router;