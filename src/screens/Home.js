import React, { Component } from 'react';
import {
  Image,
  Text,
  View,
} from 'react-native';
import Router from '../navigation/Router';
import { BackgroundImage, Button } from '../components';
import Globals from '../Globals';

export default class Home extends Component {
  static route = {
    navigationBar: {
      visible: false,
		},
	};

  _goToScreen = name => () => {
    this.props.navigator.push(Router.getRoute(name));
  };

  render() {
    const { container, logo, textConf, textReact } = styles;

    return (
      <BackgroundImage>
        <View style={container}>
          <Image source={require('../../assets/images/logo.png')} style={logo}/>
          <Text style={textReact}>
            REACT
          </Text>
          <Text style={textConf}>
            CONFBR
          </Text>
          
          
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

// TODO (heloa): change logo's black to #161616

const styles = {
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    marginBottom: 10,
    width: 144, 
    height: 130,
  },
  textReact: {
    color: Globals.colors.white,
    fontFamily: 'OpenSans-ExtraBold',
  },
  textConf: {
    color: Globals.colors.primary_blue,
    fontFamily: 'OpenSans-Regular',
  }
};