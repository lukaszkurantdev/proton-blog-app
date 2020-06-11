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
import RootStore from '../core/store/RootStore';

interface IProps {
  store: RootStore;
  navigation: any;
}

class LoginPage extends React.Component<IProps> {
  navigateToRegisterPage = () => {
    this.props.navigation.navigate('Register');
  };

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
            {TranslationService.t('login_into')}
          </Text>
        </View>
        <View style={styles.bottomContainer}>
          <Input placeholder={TranslationService.t('username')} />

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
            <Text
              style={styles.primaryText}
              onPress={this.navigateToRegisterPage}>
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
