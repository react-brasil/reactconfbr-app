import React from 'react';
import {
  Text,
  TouchableHighlight
} from 'react-native';

const Button = ({ onPress, children }) => {
  const { buttonStyle, textStyle } = styles;
  
  return (
    <TouchableHighlight underlayColor={'#202020'} onPress={onPress} style={buttonStyle}>
      <Text selectionColor={'#61DAFB'} style={textStyle}>
        {children}
      </Text>
    </TouchableHighlight>
  );
}

const styles = {
  buttonStyle: {
    alignSelf: 'stretch',
    backgroundColor: '#61DAFB',
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#61DAFB',
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 70,
    marginRight: 70,
  },
  textStyle: {
    alignSelf: 'center',
    color: '#161616',
    fontFamily: 'Roboto',
    fontWeight: '900',
    fontSize: 20,
    paddingTop: 10,
    paddingBottom: 10
  }
}

export { Button };