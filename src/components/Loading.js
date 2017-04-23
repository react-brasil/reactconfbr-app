import React, { PropTypes } from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';

const Loading = ({ fullScreen }) => {
  propTypes = {
    fullScreen: PropTypes.bool,
  };

  if (fullScreen) {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
      </View>
    );
  }

  return <ActivityIndicator />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Loading;
