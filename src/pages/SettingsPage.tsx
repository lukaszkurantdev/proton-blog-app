import React from 'react';
import {Text, StyleSheet} from 'react-native';
import {inject, observer} from 'mobx-react';
import RNRestart from 'react-native-restart';
//components
import Button from '../components/Button';
import TopBar from '../components/TopBar';
//services
import TranslationService from '../core/services/TranslationService';
//stores
import RootStore from '../core/store/RootStore';
import GlobalStyles from '../styles/GlobalStyles';

interface IProps {
  store: RootStore;
  navigation: any;
}

@inject('store')
@observer
export default class SettingsPage extends React.Component<IProps> {
  logout = () => {
    this.props.store.userAuthStore.logout(() => {
      this.props.store.connectionStore.closeSocket();
      RNRestart.Restart();
    });
  };

  render() {
    return (
      <>
        <TopBar title={TranslationService.t('settings')} />

        <Text style={[GlobalStyles.mainHeaderDescription, styles.versionText]}>
          Proton Blog App{'\n'}v1.0.1
        </Text>
        <Button
          type="secondary"
          title={TranslationService.t('logout')}
          onPress={this.logout}
        />
      </>
    );
  }
}

const styles = StyleSheet.create({
  versionText: {
    padding: 20,
  },
});
