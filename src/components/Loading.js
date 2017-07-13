//@flow
import React from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';

type Props = {
  fullScreen?: boolean
}

const Loading = ({ fullScreen } : Props ) => {
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
