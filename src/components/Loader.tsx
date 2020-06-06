import React from 'react';
import {StyleSheet, View, ActivityIndicator} from 'react-native';
//styles
import Colors from '../styles/Colors';

const Loader = () => (
  <View style={styles.container}>
    <ActivityIndicator size="large" color={Colors.PRIMARY} />
  </View>
);

export default Loader;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
