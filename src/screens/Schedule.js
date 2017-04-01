import React, { Component } from 'react';
import {
  Text,
  View,
} from 'react-native';

export default class Schedule extends Component {
  static route = {
    navigationBar: {
      title: 'Schedule',
		},
	}

  render() {
    return (
			<View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
				<Text onPress={this.handlePress}>Schedule!</Text>
			</View>
    )
  }
}