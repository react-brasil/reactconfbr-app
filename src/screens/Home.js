import React, { Component } from 'react';
import {
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Router from '../navigation/Router';
import { Button } from '../components';

export default class Home extends Component {
  static route = {
    navigationBar: {
      title: 'Home',
		},
	}

  _goToScreen = name => () => {
    this.props.navigator.push(Router.getRoute(name));
  }

  render() {
    const { containerStyle, logoStyle } = styles;

    return (
			<View style={containerStyle}>
        <Image source={require('../../assets/images/logo.png')} style={logoStyle}/>
        <Button onPress={this._goToScreen('schedule')}>
          AGENDA
        </Button>
        <Button onPress={this._goToScreen('location')}>
          COMO CHEGAR
        </Button>
        <Button onPress={this._goToScreen('about')}>
          SOBRE
        </Button>
			</View>
    )
  }
}


const styles = {
  containerStyle: {
    flex: 1,
    backgroundColor: '#161616',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoStyle: {
    marginBottom: 40,
    width: 144, 
    height: 130,
  },
}