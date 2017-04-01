import React, { Component } from 'react';
import {
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import Router from '../navigation/Router';

export default class Home extends Component {
  static route = {
    navigationBar: {
      title: 'Home'
		}
	}

  _goToScreen = name => () => {
    this.props.navigator.push(Router.getRoute(name));
  }

  render() {
    return (
			<View style={styles.container}>
        <TouchableOpacity onPress={this._goToScreen('schedule')}>
          <Text>Schedule</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this._goToScreen('location')}>
          <Text>Location</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this._goToScreen('about')}>
          <Text>About</Text>
        </TouchableOpacity>
			</View>
    )
  }
}

const styles = {
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
}