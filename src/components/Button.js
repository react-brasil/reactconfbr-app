import React from 'react';
import {
  Text,
  TouchableHighlight,
} from 'react-native';
import Globals from '../Globals';

const Button = ({ onPress, children }) => {
  const { buttonStyle, textStyle } = styles;
  
  return (
    <TouchableHighlight underlayColor={Globals.colors.dark_gray} onPress={onPress} style={buttonStyle}>
      <Text selectionColor={Globals.colors.primary_blue} style={textStyle}>
        {children}
      </Text>
    </TouchableHighlight>
  );
}

const styles = {
  buttonStyle: {
    alignSelf: 'stretch',
    backgroundColor: Globals.colors.primary_blue,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: Globals.colors.primary_blue,
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 70,
    marginRight: 70,
  },
  textStyle: {
    alignSelf: 'center',
    color: Globals.colors.primary_black,
    fontFamily: 'Roboto',
    fontWeight: '900',
    fontSize: 20,
    paddingTop: 10,
    paddingBottom: 10,
  },
}

export { Button };