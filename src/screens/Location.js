//@flow
import React, { PureComponent } from 'react';
import I18n from '../i18n';
import {
  Alert,
  Linking,
  Platform,
  ScrollView,
  StyleSheet,
  Text
} from 'react-native';

// $FlowFixMe
import { MapView } from 'expo';

import Globals from '../Globals';

class Location extends PureComponent {
  static navigationOptions = {
    title: I18n.t('location')
  };

  handleOpenAddress = async () => {
    const location = `${Globals.location.coordinate.latitude},${Globals.location
      .coordinate.longitude}`;
    const mapsUrl =
      Platform.OS === 'ios'
        ? `http://maps.apple.com/?ll=${location}`
        : `geo:${location}`;

    const canOpenMaps = await Linking.canOpenURL(mapsUrl);
    if (!canOpenMaps) {
      return Alert.alert(
        I18n.t('error'),
        I18n.t('noMapApp')
      );
    }

    // TODO (lucasbento): add loading state before opening the map app
    Linking.openURL(mapsUrl);
  };

  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.locationInfo}>
          { I18n.t('locationDescription') } {Globals.location.place} ({Globals.location.address})
        </Text>

        <MapView
          style={styles.map}
          initialRegion={Globals.location.coordinate}
          onPress={this.handleOpenAddress}
        >
          <MapView.Marker
            title="SENAI"
            coordinate={Globals.location.coordinate}
          />
        </MapView>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10
  },
  locationInfo: {
    textAlign: 'center',
    fontSize: 16,
    marginBottom: 20
  },
  map: {
    height: '50%'
  }
});

export default Location;
