import React, { Component } from 'react';
import {
  Text,
  View,
} from 'react-native';

export default class Schedule extends Component {
  static route = {
    navigationBar: {
      title: 'AGENDA',
		},
	}

  render() {
    const { containerStyle } = styles;
    return (
			<View style={containerStyle}>
				<Text onPress={this.handlePress}>Schedule!</Text>
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