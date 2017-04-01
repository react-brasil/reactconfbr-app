import React, { Component } from 'react';
import {
  Text,
  View
} from 'react-native';

export default class Location extends Component {
  static route = {
    navigationBar: {
      title: 'Location'
		}
	}

  render() {
    return (
			<View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
				<Text onPress={this.handlePress}>Location!</Text>
			</View>
    )
  }
}