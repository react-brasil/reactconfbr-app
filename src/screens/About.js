//@flow
import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { connectActionSheet } from '@expo/react-native-action-sheet';
import { SimpleLineIcons } from '@expo/vector-icons';
import I18n from '../i18n';

@connectActionSheet
class About extends Component {
  static navigationOptions = {
    title: I18n.t('about')
  };

  render() {
    const { container } = styles;
    return (
      <View style={container}>
        <View>
          <Text style={{ textAlign: 'center' }}>Hello all!</Text>
        </View>

        <SimpleLineIcons.Button
          name="social-twitter"
          backgroundColor="#3e3e3e"
          onPress={this._onOpenActionSheet}
        >
          <Text style={{ fontSize: 15, color: '#fff' }}>Open action sheet</Text>
        </SimpleLineIcons.Button>
      </View>
    );
  }

  _onOpenActionSheet = () => {
    let options = ['Delete', 'Save', 'Cancel'];
    let destructiveButtonIndex = 0;
    let cancelButtonIndex = 2;
    this.props.showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
        destructiveButtonIndex
      },
      buttonIndex => {
        console.log('buttonIndex: ', buttonIndex);
      }
    );
  };
}

const styles = {
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  }
};

export default About;
