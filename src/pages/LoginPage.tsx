import React from 'react';
import {View, StyleSheet, Text, StatusBar} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
//components
import Button from '../components/Button';
import Input from '../components/Input';
import Loader from '../components/Loader';
//styles
import Colors from '../styles/Colors';
import GlobalStyles from '../styles/GlobalStyles';
//services
import TranslationService from '../core/services/TranslationService';

class LoginPage extends React.Component {
  render = () => {
    return (
      <KeyboardAwareScrollView>
        <StatusBar barStyle="dark-content" />
        <View style={styles.topContainer}>
          <View style={[styles.iconContainer, GlobalStyles.shadow]}>
            <Icon name="ios-planet" size={70} color={Colors.WHITE} />
          </View>
          <Text
            style={[
              GlobalStyles.mainHeader,
              styles.centered,
              styles.mainHeader,
            ]}>
            {TranslationService.t('default_server')}
          </Text>
          <Text style={[GlobalStyles.mainHeaderDescription, styles.centered]}>
            {TranslationService.t('login_into')}
          </Text>
        </View>
        <View style={styles.bottomContainer}>
          <Input placeholder={TranslationService.t('nickname')} />
          <Input placeholder={TranslationService.t('password')} />
          <Button title={TranslationService.t('login')} />
          <View style={GlobalStyles.separator} />
          <Text
            style={[
              GlobalStyles.mainHeaderDescription,
              styles.centered,
              styles.description,
            ]}>
            {TranslationService.t('dont_have_account')}{' '}
            <Text style={styles.primaryText}>
              {TranslationService.t('sign_up')}
            </Text>
          </Text>
        </View>
      </KeyboardAwareScrollView>
    );
  };
}

export default LoginPage;

const styles = StyleSheet.create({
  topContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 50,
  },
  iconContainer: {
    height: 100,
    width: 100,
    backgroundColor: Colors.SECONDARY,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
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
