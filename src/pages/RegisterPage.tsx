import React from 'react';
import {View, StyleSheet, Text, StatusBar} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
//components
import Button from '../components/Button';
import Input from '../components/Input';
import ProtonIcon from '../components/ProtonIcon';
import Loader from '../components/Loader';
//styles
import Colors from '../styles/Colors';
import GlobalStyles from '../styles/GlobalStyles';
//services
import TranslationService from '../core/services/TranslationService';

class RegisterPage extends React.Component {
  render = () => {
    return (
      <KeyboardAwareScrollView>
        <StatusBar barStyle="dark-content" />
        <View style={styles.topContainer}>
          <ProtonIcon type="primary" />
          <Text
            style={[
              GlobalStyles.mainHeader,
              styles.centered,
              styles.mainHeader,
            ]}>
            {TranslationService.t('default_server')}
          </Text>
          <Text style={[GlobalStyles.mainHeaderDescription, styles.centered]}>
            {TranslationService.t('register_into')}
          </Text>
        </View>
        <View style={styles.bottomContainer}>
          <Input placeholder={TranslationService.t('nickname')} />

          <Input placeholder={TranslationService.t('password')} />

          <Input placeholder={TranslationService.t('confirm_password')} />

          <Button title={TranslationService.t('sign_up')} />

          <View style={GlobalStyles.separator} />

          <Text
            style={[
              GlobalStyles.mainHeaderDescription,
              styles.centered,
              styles.description,
            ]}>
            {TranslationService.t('have_account')}{' '}
            <Text style={styles.primaryText}>
              {TranslationService.t('sign_in')}
            </Text>
          </Text>
        </View>
      </KeyboardAwareScrollView>
    );
  };
}

export default RegisterPage;

const styles = StyleSheet.create({
  topContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 50,
  },
  bottomContainer: {
    flex: 1,
    top: -20,
    backgroundColor: Colors.BACKGROUND,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 30,
  },
  centered: {
    textAlign: 'center',
  },
  buttonMargins: {
    marginVertical: 15,
  },
  description: {
    marginTop: 10,
    marginBottom: 30,
  },
  mainHeader: {
    marginTop: 20,
  },
  primaryText: {
    color: Colors.SECONDARY,
  },
});
