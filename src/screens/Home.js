import React, { Component } from 'react';
import { Image, Text, View } from 'react-native';
import { BackgroundImage, Button } from '../components';
import Globals from '../Globals';

export default class Home extends Component {
  _goToScreen = name => () => {
    const { navigate } = this.props.navigation;
    navigate(name);
  };

  render() {
    const { container, logo, textConf, textReact } = styles;

    return (
      <BackgroundImage>
        <View style={container}>
          <Image
            source={require('../../assets/images/logo.png')}
            style={logo}
          />
          <Text style={textReact}>
            REACT
            <Text style={textConf}>CONFBR</Text>
          </Text>

          <Button onPress={this._goToScreen('schedule')}>AGENDA</Button>
          <Button onPress={this._goToScreen('location')}>COMO CHEGAR</Button>
          <Button onPress={this._goToScreen('about')}>SOBRE</Button>
        </View>
      </BackgroundImage>
    );
  }
}

// TODO (heloa): change logo's black to #161616

const styles = {
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  logo: {
    marginBottom: 20,
    width: 144,
    height: 130
  },
  textReact: {
    fontSize: 20,
    color: Globals.colors.white,
    fontFamily: 'OpenSans-ExtraBold',
    marginBottom: 20
  },
  textConf: {
    color: Globals.colors.primary_blue,
    fontFamily: 'OpenSans-Regular'
  }
};
