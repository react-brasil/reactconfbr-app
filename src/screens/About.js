import React, { Component } from 'react';
import {
  Text,
  View,
} from 'react-native';

export default class About extends Component {
  static route = {
    navigationBar: {
      title: 'SOBRE',
		},
	}

  render() {
    const { containerStyle } = styles;
    return (
			<View style={containerStyle}>
				<Text onPress={this.handlePress}>About!</Text>
			</View>
    )
  }
}

const styles = {
  containerStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
}