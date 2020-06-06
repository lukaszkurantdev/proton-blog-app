import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
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

class StartPage extends React.Component {
  render = () => {
    return (
      <KeyboardAwareScrollView>
        <LinearGradient
          colors={[Colors.PRIMARY, Colors.SECONDARY]}
          start={{x: -1, y: -1}}
          end={{x: 1, y: 1}}
          style={styles.topContainer}>
          <View style={[styles.iconContainer, GlobalStyles.shadow]}>
            <Icon name="ios-planet" size={70} color={Colors.SECONDARY} />
          </View>
        </LinearGradient>
        <View style={styles.bottomContainer}>
          <Text style={[GlobalStyles.mainHeader, styles.centered]}>
            {TranslationService.t('app_name')}
          </Text>
          <Text style={[GlobalStyles.mainHeaderDescription, styles.centered]}>
            {TranslationService.t('app_slug')}
          </Text>
          <Button title={TranslationService.t('default_server_conn')} />
          <View style={styles.separator} />
          <Text
            style={[
              GlobalStyles.mainHeaderDescription,
              styles.centered,
              styles.description,
            ]}>
            {TranslationService.t('write_manual')}
          </Text>
          <Input placeholder={TranslationService.t('ip_address')} />
          <Button title={TranslationService.t('connect')} type="secondary" />
        </View>
      </KeyboardAwareScrollView>
    );
  };
}

export default StartPage;

const styles = StyleSheet.create({
  topContainer: {
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 10,
  },
  iconContainer: {
    height: 100,
    width: 100,
    backgroundColor: Colors.WHITE,
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
  separator: {
    backgroundColor: Colors.GRAY,
    marginVertical: 20,
    height: 1,
    width: '40%',
    alignSelf: 'center',
  },
});
