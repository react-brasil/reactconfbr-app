import React, { Component } from 'react';
import {
  Image,
  View,
} from 'react-native';
import Router from '../navigation/Router';
import { BackgroundImage, Button } from '../components';

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
      <BackgroundImage>
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
      </BackgroundImage>
    )
  }
}

// TODO: change logo's black to #161616

const styles = {
  containerStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoStyle: {
    marginBottom: 40,
    width: 144, 
    height: 130,
  },
}