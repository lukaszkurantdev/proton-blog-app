import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
//styles
import GlobalStyles from '../styles/GlobalStyles';
//services
import TranslationService from '../core/services/TranslationService';

const ErrorContainer = () => (
  <View style={styles.container}>
    <Text style={GlobalStyles.mainHeader}>
      {TranslationService.t('list_error')}
    </Text>
    <Text style={GlobalStyles.mainHeaderDescription}>
      {TranslationService.t('try_later')}
    </Text>
  </View>
);

export default ErrorContainer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
